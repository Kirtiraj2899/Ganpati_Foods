import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, finalize } from 'rxjs';
import { LoginPageComponent } from '../login-page/login-page.component';
import { Shop } from '../model/shop';
import { AuthService } from '../shared/auth.service';
import { ShopService } from '../shared/shop.service';

@Component({
  selector: 'app-shop-registration',
  templateUrl: './shop-registration.component.html',
  styleUrls: ['./shop-registration.component.css']
})
export class ShopRegistrationComponent {

  showPwd:any;
  isSubmitted : boolean = false;

  url="assets/Images/UserImg.png";
  selectedImage : any=null;
   title = "cloudsSorage";
  selectedFile : any=null;
  fb:any;
  downloadURL: Observable<string> | undefined;
 

  onselectFile(e:any) {
    if(e.target.files && e.target.files[0]){
      const reader = new FileReader();
      reader.onload = (event : any) =>{
        this.url = event.target.result;
     }
     reader.readAsDataURL(e.target.files[0]);
     this.selectedImage = e.target.files[0];
    }
    else{
      this.url ="";
      this.selectedImage = null;
    }
  }

  openDialogSignIn(){
    this.dialogRef.open(LoginPageComponent);
  }
  
  passwordToggle(){
    this.showPwd =! this.showPwd;
  }

  // validation



  shopReg=new FormGroup({
    fullname:new FormControl('',[Validators.required]),
    contact:new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[9]+[0-9]{9}$")]),
    address:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9!@#$%^_&*()]+')]),
    password:new FormControl('',[Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{4,}')]),
    email:new FormControl('',[Validators.required, Validators.email]),
    age:new FormControl('',[Validators.required]),
    conpassword:new FormControl('',[Validators.required]),
    cprofile:new FormControl('',[Validators.required])
  })

  get fullname(){
    return this.shopReg.get('fullname')
  }

  get contact(){
    return this.shopReg.get('contact')
  }

  get address(){
    return this.shopReg.get('address')
  }

  get password(){
    return this.shopReg.get('password')
  }

  get email(){
    return this.shopReg.get('email')
  }

  get age(){
    return this.shopReg.get('age')
  }

  get conpassword(){
    return this.shopReg.get('conpassword')
  }


  //registration

  shopObj : Shop ={
    sid: '',
    sname: '',
    sprofile: '',
    smobile: '',
    semail: '',
    saddress: '',
    sgst: '',
    spassword: '',
    sconpassword: ''
  };

  sid : string = '';
  sname : string = '';
  smobile : string = '';
  saddress : string = '';
  spassword : string = '';
  sprofile : string = '';
  semail : string = '';
  sgst : string = '';
  sconpassword : string = '';

  constructor(private shop : ShopService , private auth : AuthService,private dialogRef : MatDialog,private storage: AngularFireStorage, private firestore: AngularFirestore) {}
    
 

  

  resetForm() {
    this.sid  = '';
    this.sname  = '';
    this.smobile  = '';
    this.saddress = '';
    this.spassword  = '';
    this.sprofile  = '';
    this.semail  = '';
    this.sgst = '';
    this.sconpassword = '';
  }


  addShop() {
 
    // this.customerObj.cid = '';
    // this.customerObj.cname = this.cname;
    // this.customerObj.cmobile = this.cmobile;
    // this.customerObj.caddress = this.caddress;
    // this.customerObj.cpassword = this.cpassword;
    // this.customerObj.cprofile = this.cprofile;
    // this.customerObj.cemail = this.cemail;
    // this.customerObj.cage = this.cage;
    // this.customerObj.cconpassword = this.cconpassword;

    // localStorage.setItem("customer",JSON.stringify(this.customerReg.value));
    
    
    // this.customer.addCustomer(this.customerObj);
     
    // this.onFileSelected(null);

    const n = Date.now();
    const filePath = `Shops/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedImage);

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe((url) => {
          if (url) {
            this.shopObj.sprofile = url; // Save the image URL to the customerObj.pimage property

            // Now add the entire product object to Firestore
            this.shopObj.sid = this.firestore.createId(); // Generate a unique ID for the product
            this.shopObj.sname = this.sname;
            this.shopObj.smobile = this.smobile;
            this.shopObj.semail = this.semail;
            this.shopObj.saddress = this.saddress;
            this.shopObj.sgst = this.sgst;
            this.shopObj.spassword = this.spassword;
            this.shopObj.sconpassword = this.sconpassword;
            this.auth.register(this.semail,this.spassword);
            this.resetForm();
            this.shop.addShop(this.shopObj).then(() => {
              this.resetForm();
              
            }).catch((error) => {
              console.error('Error saving product details:', error);
            });
          }
        });
      })
    ).subscribe((url) => {
      if (url) {
        console.log(url);
      }
    });
    
  
  }

  updateCustomer() {

  }

 
 
  // onFileSelected(event:any) {
  //   var n = Date.now();
  //   const file = event.target.files[0];
  //   const filePath = `Customers/${n}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(`Customers/${n}`, file);
  //   task
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         this.downloadURL = fileRef.getDownloadURL();
  //         this.downloadURL.subscribe(url => {
  //           if (url) {
  //             this.fb = url;
  //           }
  //           console.log(this.fb);
  //         });
  //       })
  //     )
  //     .subscribe(url => {
  //       if (url) {
  //         console.log(url);
  //       }
  //     });
  // }
 
  // onFileSelected(event: any) {
  //   const n = Date.now();
  //   const file = event.target.files[0];
  //   const filePath = `Customers/${n}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(filePath, file);
    
  //   task.snapshotChanges().pipe(
  //     finalize(() => {
  //       this.downloadURL = fileRef.getDownloadURL();
  //       this.downloadURL.subscribe((url) => {
  //         if (url) {
  //           this.fb = url;
  //           this.saveImageToFirestore(filePath, this.fb); // Save the image URL to Firestore
  //         }
  //       });
  //     })
  //   ).subscribe((url) => {
  //     if (url) {
  //       console.log(url);
  //     }
  //   });
  // }

  // // Function to save the image URL to Firestore
  // saveImageToFirestore(filePath: string, imageUrl: string) {
  //   this.firestore.collection('Customers').add({
  //     filePath: filePath,
  //     imageUrl: imageUrl
  //   }).then((docRef) => {
  //     console.log('Image URL saved to Firestore:', docRef.id);
  //   }).catch((error) => {
  //     console.error('Error saving image URL:', error);
  //   });
  // }
}
