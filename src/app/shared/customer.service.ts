import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private afs : AngularFirestore,private fireauth: AngularFireAuth, private router: Router) { }

  
   

  //add Customer

  addCustomer(customer : Customer){
    customer.cid = this.afs.createId();
    return this.afs.collection('/Customers').add(customer);
  }

  //get all Customer

  getAllCustomer(){
    return this.afs.collection('/Customers').snapshotChanges();
  }

  //delete Customer

  

  deleteCustomer(customer : Customer){
    return this.afs.doc('/Customers/'+customer.cid).delete();
  }

  //update Customer

  updateCustomer(customer : Customer) {
    this.deleteCustomer(customer);
    this.addCustomer(customer);
  }

   // customer login method

   custlogin(cemail : string , cpassword : string){
    this.fireauth.signInWithEmailAndPassword(cemail,cpassword).then( () => {
      localStorage.setItem('token','true');
      this.router.navigate(['/admin']);
    }, err =>{
      alert(err.message);
      this.router.navigate(['/login']);

    })
  }


   // sign out

   logout() {
    this.fireauth.signOut().then ( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }, err => {
      alert(err.message);
    })
   }

}
