import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // login method

 
  login(email : string , password : string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
      localStorage.setItem('token','true');
      

      if(res.user?.emailVerified == true){
        this.router.navigate(['/']);
      }
      else{
        alert('Please first varify your email');
      }
    }, err =>{
      alert(err.message);
      this.router.navigate(['/login']);

    })
  }
   // registrer method
    
   register(email : string , password : string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res =>{
      alert('registration Successful');
      this.router.navigate(['/login']);
      this.sendEmailForVarification(res.user);
    }, err =>{
      alert(err.message);
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

   //forgot password
   forgotPassword(email : string){
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      alert('Vaify Email')
    }, err => {
      alert('Something went wrong');
    })
   }

   //email varification
   sendEmailForVarification(user : any){
    user.sendEmailVerification().then((res : any) =>{
      alert('vefify your email');
    }, (err : any) => {
      alert('Something went wrong . Not able to send mail to your Email')
    })
   }
}
