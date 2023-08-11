import { Component, QueryList, ViewChildren } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { BillItem } from '../model/bill-item';
import { CartItem } from '../model/cart-item';
import { CartService } from '../shared/cart.service';
import { SharedCartService } from '../shared/shared-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  @ViewChildren('totalElement')
  totalElements!: QueryList<any>;
public products : any = [];
grandTotal: number = 0;
showMore = false;
isLoggedIn = false;
cartItemList: CartItem[] = [];
shippingAddress: string = '';


  constructor(private cart : CartService, private afAuth: AngularFireAuth, private router: Router ,private SharedCartService:SharedCartService){
    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnInit(): void{
    this.cart.getProducts().subscribe(res =>{
      this.products = res;
      // this.grandTotal =this.cart.getTotalPrice(); 
      this.cartItemList = res;
    })
    this.calculateGrandTotal();
  }

  


  removeItem(item : any){
     this.cart.removeCartItem(item);
  }

  emptycart(){
    this.cart.removeAllCart();
  }

  inc(item : any){
    item.quantity+=1;
  }

  decs(item : any){
    if(item.quantity!= 1){
      item.quantity-=1;
    }
    
  }
  ngAfterViewInit() {
    this.calculateGrandTotal();
  }

  total(item : any){
    item.total= item.psellprice*item.quantity;
    this.calculateGrandTotal();
  }

  calculateGrandTotal() {
    this.grandTotal = this.totalElements.reduce((total, el) => total + parseFloat(el.nativeElement.innerText), 0);
  }
  

  // //save cart

  // saveCartToFirestore() {
  //   // Get the currently logged-in user from the user observable
  //   this.afAuth.user.subscribe(user => {
  //     if (user) {
  //       const userId = user.uid;
  //       // Transform the cartItemList into an array of CartItem objects
  //       const cartItems: CartItem[] = this.cartItemList.map((item: any) => {
  //         return {
  //           pid: item.pid,
  //           quantity: item.quantity,
  //           total: item.total
  //         };
  //       });

  //       // Call the saveCartItems function with the transformed cartItems array and the user ID
  //       this.cart.saveCartItems(userId).then(() => {
  //         console.log('Cart items saved to Firestore successfully!');
  //       }).catch((error) => {
  //         console.error('Error saving cart items:', error);
  //       });
  //     } else {
  //       console.error('User not logged in. Cannot save cart items.');
  //     }
  //   });
  // }

  // Save cart and generate the bill
  async ConfirmOrder(shippingAddress: string) {
    const userId = firebase.auth().currentUser?.uid;

    if (userId && shippingAddress !== undefined) {
      try {
        // Save the cart items to Firestore
        await this.cart.saveCartItems(userId);
        console.log('Cart items saved to Firestore successfully!');

        // Generate the bill
        const billItems: BillItem[] = this.cart.generateBill(userId, this.cartItemList, shippingAddress);
        console.log('Bill generated:', billItems);

        // Store the cart items and total amount in the shared service
        this.SharedCartService.cartItems = billItems;
        this.SharedCartService.totalAmount = this.calculateTotalAmount(billItems);

        

        // Clear the cart after successful checkout
        this.cart.removeAllCart();

      } catch (error) {
        console.error('Error during the order confirmation:', error);
      }
    } else {
      console.error('User is not logged in or shippingAddress is undefined.');
    }
  }

  // ...

  calculateTotalAmount(cartItems: BillItem[]): number {
    return cartItems.reduce((total, item) => total + item.total, 0);
  }
}
