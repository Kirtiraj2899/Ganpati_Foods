import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-shope-page',
  templateUrl: './shope-page.component.html',
  styleUrls: ['./shope-page.component.css']
})
export class ShopePageComponent {
  isLoggedIn = false;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      this.isLoggedIn = !!user;
    });
  }
}
