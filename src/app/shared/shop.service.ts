import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Shop } from '../model/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private afs : AngularFirestore,private fireauth: AngularFireAuth, private router: Router) { }

  //add Shop

  addShop(shop : Shop){
    shop.sid = this.afs.createId();
    return this.afs.collection('/Shop').add(shop);
  }

  //get all Shop

  getAllShop(){
    return this.afs.collection('/Shop').snapshotChanges();
  }

  //delete shop

  deleteShop(shop : Shop){
    return this.afs.doc('/Shop/'+shop.sid).delete();
  }

  //update shop

  updateShop(shop : Shop) {
    this.deleteShop(shop);
    this.addShop(shop);
  }

}
