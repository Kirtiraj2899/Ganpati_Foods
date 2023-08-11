import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { ShippingAddress } from '../model/shipping-address';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent {

  isLoggedIn = false;
  userId: string | null = null;
  shippingAddresses !: Observable<ShippingAddress[]>;
  newShippingAddress: ShippingAddress = {
    userId: '',
    firstname: '',
    lastname: '',
    address: '',
    mobile: '',
    alternate: '',
    zipCode: ''
  };

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore , private router: Router) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userId = user.uid;
        this.shippingAddresses = this.afs.collection<ShippingAddress>('shipping_addresses', ref => ref.where('userId', '==', this.userId)).valueChanges();
      } else {
        this.userId = null;
      }
    });
    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnInit(): void {
  }

  id : string = '';
  firstname : string = '';
  lastname : string = '';
  address : string = '';
  mobile : string = '';
  alternate : string = '';
  zipCode : string = '';
  

  addShippingAddress() {
    if (this.userId) {
      this.newShippingAddress.userId = this.userId;
      this.afs.collection<ShippingAddress>('shipping_addresses').add(this.newShippingAddress).then(() => {
        window.alert('New shipping address added successfully!');
        // Reset the newShippingAddress object for the next entry
        this.newShippingAddress = {
          userId: this.userId,
          firstname: '',
          lastname: '',
          address: '',
          mobile: '',
          alternate: '',
          zipCode: ''
        };
       
      }).catch((error) => {
        console.error('Error adding shipping address:', error);
      });
    }
  }

}
