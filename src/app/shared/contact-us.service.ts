import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ContactUs } from '../model/contact-us';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private afs : AngularFirestore,private fireauth: AngularFireAuth, private router: Router) { }

   //add ContactUs

   addContactUS(contactus : ContactUs){
    contactus.contid = this.afs.createId();
    return this.afs.collection('/ContactUs').add(contactus);
  }

  //get all ContactUs

  getAllContactUS(){
    return this.afs.collection('/ContactUs').snapshotChanges();
  }

  //delete ContactUs

  deleteContactUS(contactus : ContactUs){
    return this.afs.doc('/ContactUs/'+contactus.contid).delete();
}

}
