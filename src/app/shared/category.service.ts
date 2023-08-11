import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ProdCategory } from '../model/prod-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  [x: string]: any;

  constructor(private afs : AngularFirestore,private fireauth: AngularFireAuth, private router: Router) { }

  //add Category

  addProdCategory(prodcategory : ProdCategory){
    prodcategory.catid = this.afs.createId();
    return this.afs.collection('/ProdCategories').add(prodcategory);
  }

  //get all ProdCaategory

  getAllProdCaategory(){
    return this.afs.collection('/ProdCategories').snapshotChanges();
  }

  //delete ProdCaategory

  deleteProdCaategory(prodcategory : ProdCategory){
    return this.afs.doc('/ProdCategories/'+prodcategory.catid).delete();
  }
}
