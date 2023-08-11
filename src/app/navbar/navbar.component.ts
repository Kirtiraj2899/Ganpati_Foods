import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginPageComponent } from '../login-page/login-page.component';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
  
})


export class NavbarComponent {

  public totalItems : number =0;

  constructor(private dialogRef : MatDialog, private cart : CartService, private route:Router) {
    window.addEventListener('scroll', function(){
      var mattoolbar:any = document.querySelector("mat-toolbar");
      mattoolbar.classList.toggle("sticky", window.scrollY > 0);
      
    } 
    )
    
  }

  ngOnInit(): void{
    this.cart.getProducts().subscribe(res=> {
      this.totalItems = res.length;
    })


    this.route
  }

  openDialogSignIn(){
    this.dialogRef.open(LoginPageComponent);
  }

   menuVariable:boolean = false;
   menu_icon_variable:boolean = false;

   openMenu(){
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;
   }
}
