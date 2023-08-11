import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Supplier } from '../model/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private afs : AngularFirestore,private fireauth: AngularFireAuth, private router: Router) { }

  
   

  //add Supplier

  addSupplier(supplier : Supplier){
    supplier.supid = this.afs.createId();
    return this.afs.collection('/Suppliers').add(supplier);
  }

  //get all Supplier

  getAllSupplier(){
    return this.afs.collection('/Suppliers').snapshotChanges();
  }

  //delete Supplier

  

  deleteSupplier(supplier : Supplier){
    return this.afs.doc('/Suppliers/'+supplier.supid).delete();
  }

  //update Supplier

  updateSupplier(supplier : Supplier) {
    this.deleteSupplier(supplier);
    this.addSupplier(supplier);
  }
}
