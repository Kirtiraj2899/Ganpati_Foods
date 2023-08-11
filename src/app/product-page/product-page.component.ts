import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  isLoggedIn = false;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      this.isLoggedIn = !!user;
    });
  }
}
