import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent {

  public totalItems : number =0;
  userDisplayName: string | null = null;

  constructor(private dialogRef : MatDialog, private cart : CartService, private route:Router, private afAuth: AngularFireAuth) {
    
    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      if (user) {
        this.userDisplayName = user.displayName;
      } else {
        this.userDisplayName = null;
      }
    });
  }

  ngOnInit(): void{
    this.cart.getProducts().subscribe(res=> {
      this.totalItems = res.length;
    })


    this.route
  }

  

   menuVariable:boolean = false;
   menu_icon_variable:boolean = false;

   openMenu(){
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;
   }

   logout() {
    this.afAuth.signOut();
  }
}
