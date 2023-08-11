import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ContentManagement } from '../model/content-management';

@Injectable({
  providedIn: 'root'
})
export class ContentManagementService {
  productsCollection: any;
  ContentManagementsCollection: AngularFirestoreCollection<any>;

  constructor(private afs : AngularFirestore,private fireauth: AngularFireAuth, private router: Router) {
    this.ContentManagementsCollection = afs.collection<any>('contents');
    this.contents = this.productsCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<any>[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }

  //add product

  addContent(contentmanagement : ContentManagement){
    contentmanagement.contentid = this.afs.createId();
    return this.afs.collection('/Content').add(contentmanagement);

    
  }

  //get all product

  getAllContent(){
    return this.afs.collection('/Content').snapshotChanges();
  }

  //delete product

  deleteContent(contentmanagement : ContentManagement){
    return this.afs.doc('/Contente/'+contentmanagement.contentid).delete();
  }

  //update product

  // updateProduct(productId: string, data: Partial<Product>): Promise<void> {
  //   return this.afs.collection('products').doc(productId).update(data);
  // }

  private contents: Observable<any[]>;

  getProductById(contenId: string): Observable<any> {
    return this.ContentManagementsCollection.doc(contenId).valueChanges();
  }

  updateProduct(productId: string, product: Partial<ContentManagement>): Promise<void> {
    return this.afs.collection('Products').doc(productId).update(product);
  }
 
  private selectedProduct: ContentManagement | null = null;

  setSelectedProduct(contentmanagement: ContentManagement) {
    this.selectedProduct = contentmanagement;
  }

  getSelectedProduct(): ContentManagement | null {
    return this.selectedProduct;
  }
}
