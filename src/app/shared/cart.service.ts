import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { BillItem } from '../model/bill-item';
import { CartItem } from '../model/cart-item';
import { ShippingAddress } from '../model/shipping-address';
import { ProductService } from '../shared/product.service';

export interface CartData {
  cartItems: CartItem[];
  totalAmount: number;
  shippingAddress?: ShippingAddress;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartCollectionRef: AngularFirestoreCollection<any>;
  private billCollectionRef: AngularFirestoreCollection<any>;

public grandTotal = 0;
  public productList = new BehaviorSubject<any>([]);
  public cartItemList: CartItem[] = []; 

  constructor(private http : HttpClient, private afs : AngularFirestore, private product:ProductService) { 
    this.cartCollectionRef = this.afs.collection('carts');
    this.billCollectionRef = this.afs.collection('bills');
  }

  getProducts(){
     return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    // this.getTotalPrice();
    console.log(this.cartItemList)

  }

  // getTotalPrice() : number{
    
  //   this.cartItemList.map((a:any) => {
  //     this.grandTotal += a.tota;
  //   })
  //   return this.grandTotal;
  // }

  

 
  removeCartItem(product : any){
    this.cartItemList.map((a:any, index:any) => {
      if(product.id === a.id){
        this.cartItemList.splice(index,1)
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  // // save cart info to firestore
  // saveCartItems(custId: string) {
  //   const cartCollectionRef = this.afs.collection('cart');
  //   // Create a batch to update cart items in a single write operation
  //   const batch = this.afs.firestore.batch();

  //   // Loop through cart items and add each item to the batch
  //   this.cartItemList.forEach((cartItem) => {
  //     const cartItemRef: AngularFirestoreDocument<CartItem> = cartCollectionRef.doc(cartItem.pid);
  //     const itemData = {
  //       ...cartItem,
  //       custId: custId // Add the user ID to the cart item data
  //     };
  //     batch.set(cartItemRef.ref, cartItem);
  //   });

  //   // Commit the batch operation to save the cart items to Firebase
  //   return batch.commit();
  // }

   // Save the cart to Firestore
   saveCartItems(userId: string) {
    
    const cartItems: CartItem[] = this.cartItemList.map((item: any) => {
      return {
        pid: item.pid,
        pcompanyname:item.pcompanyname,
        pcategory:item.pcategory,
        pwgt:item.pwgt,
        psellprice:item.psellprice,
        quantity: item.quantity,
        total: item.psellprice*item.quantity
      };
    });

    const totalAmount = cartItems.reduce((total, item) => total + item.total, 0); // Calculate the total amount

    const cartData = {
      userId: userId,
      cartItems: cartItems,
      totalAmount: totalAmount,
      createdAt: new Date().toISOString()
    };

    return this.cartCollectionRef.add(cartData);
  }

  // Generate the bill and save it to Firestore
  // generateBill(userId: string, cartItems: CartItem[], shippingAddress: string) {
  //   const billItems: BillItem[] = cartItems.map((item: any) => {
  //     return {
  //       pid: item.pid,
  //       productName: item.pname,
  //       pcategory:item.pcategory,
  //       pwgt:item.pwgt,
  //       quantity: item.quantity,
  //       total: item.total
  //       // userId: item.pid,
  //       // billItems: item.pname,
  //       // totalAmount:item.pcategory,
  //       // shippingAddress:item.pwgt,
  //       // createdAt: item.quantity,
  //     };
  //   });

  //   const totalAmount = cartItems.reduce((total, item) => total + item.total, 0);

  //   const billData = {
  //     userId: userId,
  //     billItems: billItems,
  //     totalAmount: totalAmount,
  //     shippingAddress: shippingAddress,
  //     createdAt: new Date().toISOString()
  //   };

  //   return this.billCollectionRef.add(billData);
  // }
  
  // Fetch the cart items and the shipping address from Firestore
  async getCartAndShippingData(userId: string): Promise<CartData> {
    try {
      const cartItemsCollectionRef = this.afs.collection('carts', ref => ref.where('userId', '==', userId));
      const snapshot = await cartItemsCollectionRef.get().toPromise();
  
      const cartItems: CartItem[] = [];
      if (snapshot) {
        snapshot.forEach(doc => {
          const data = doc.data() as CartItem;
          const cartItem: CartItem = {
            pid: data.pid,
            pcompanyname: data.pcompanyname,
            pcategory: data.pcategory,
            pwgt: data.pwgt,
            psellprice: data.psellprice,
            quantity: data.quantity,
            total: data.total
          };
          cartItems.push(cartItem);
        });
      }
  
      // Fetch shipping address from Firestore
      const shippingAddressSnapshot = await this.afs.collection('shipping_addresses', ref => ref.where('userId', '==', userId)).get().toPromise();
  
      if (!shippingAddressSnapshot) {
        throw new Error('Shipping address data not found.');
      }
  
      let shippingAddress: ShippingAddress | undefined;
      if (!shippingAddressSnapshot.empty) {
        const data = shippingAddressSnapshot.docs[0].data() as ShippingAddress;
        shippingAddress = {
          userId:data.userId,
          firstname: data.firstname,
          lastname: data.lastname,
          address: data.address,
          mobile: data.mobile,
          alternate: data.alternate,
          zipCode: data.zipCode
        };
      }
  
      // Calculate total amount
      const totalAmount = cartItems.reduce((total, item) => total + item.total, 0);
  
      // Return the cart data
      return { cartItems, totalAmount, shippingAddress };
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }
  }

  generateBill(userId: string, cartItems: CartItem[], shippingAddress: string): BillItem[] {
    return cartItems.map((item: CartItem) => {
      const total = item.psellprice * item.quantity;
      return {
        pid: item.pid,
        pcompanyname: item.pcompanyname,
        pcategory: item.pcategory,
        pwgt: item.pwgt,
        psellprice: item.psellprice,
        quantity: item.quantity,
        total: total
      };
    });
  }

  async saveBill(userId: string, billItems: BillItem[], shippingAddress: string) {
  try {
    // Calculate the total amount for the bill
    const totalAmount = billItems.reduce((total, item) => total + item.total, 0);

    // Create the bill data object
    const billData = {
      userId: userId,
      billItems: billItems,
      totalAmount: totalAmount,
      shippingAddress: shippingAddress,
      createdAt: new Date().toISOString()
    };

    // Save the bill to Firestore
    const billRef = await this.afs.collection('bills').add(billData);
    console.log('Bill saved to Firestore with ID:', billRef.id);
  } catch (error) {
    console.error('Error saving the bill to Firestore:', error);
    throw error;
  }
}
}
