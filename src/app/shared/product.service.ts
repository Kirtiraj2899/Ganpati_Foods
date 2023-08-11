import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs : AngularFirestore,private fireauth: AngularFireAuth, private router: Router) {
    this.productsCollection = afs.collection<any>('products');
    this.products = this.productsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }

  //add product

  addProduct(product : Product){
    product.pid = this.afs.createId();
    return this.afs.collection('/Products').add(product);

    
  }

  //get all product

  getAllProduct(){
    return this.afs.collection('/Products').snapshotChanges();
  }

  //delete product

  deleteProduct(product : Product){
    return this.afs.doc('/Products/'+product.pid).delete();
  }

  //update product

  // updateProduct(productId: string, data: Partial<Product>): Promise<void> {
  //   return this.afs.collection('products').doc(productId).update(data);
  // }

  private productsCollection: AngularFirestoreCollection<any>;
  private products: Observable<any[]>;

  getProductById(productId: string): Observable<any> {
    return this.productsCollection.doc(productId).valueChanges();
  }

  updateProduct(productId: string, product: Partial<Product>): Promise<void> {
    return this.afs.collection('Products').doc(productId).update(product);
  }
 
  private selectedProduct: Product | null = null;

  setSelectedProduct(product: Product) {
    this.selectedProduct = product;
  }

  getSelectedProduct(): Product | null {
    return this.selectedProduct;
  }
}
