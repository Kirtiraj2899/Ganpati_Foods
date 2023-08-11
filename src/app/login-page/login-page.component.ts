import { Component } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  showPwd:any;
  
  passwordToggle(){
    this.showPwd =! this.showPwd;
  }


  //login

  
  email : string = '';
  password : string = '';

  constructor( private router: Router,private auth : AuthService, private dialogRef : MatDialog){}
  
  login() {

    if(this.email == ''){
      alert('Please Enter Email ');
      return;
    }
    
    if(this.password == ''){
      alert('Please Enter password ');
      return;
    }

    if(this.email=='admin123@gmail.com'){
      if(this.password=='admin@123'){
        alert("Login successfull..");
        this.router.navigate(['/admin']);
      }
      else{
        alert("Invalid Password")
      }
    }
    

    this.auth.login(this.email,this.password);
    this.email = '';
    this.password = '';
    
  }

  openDialog(){
    this.dialogRef.open(ForgotPasswordComponent);
  }

}
