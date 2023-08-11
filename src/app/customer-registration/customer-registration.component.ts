import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, finalize } from 'rxjs';
import { LoginPageComponent } from '../login-page/login-page.component';
import { Customer } from '../model/customer';
import { AuthService } from '../shared/auth.service';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent {

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



  customerReg=new FormGroup({
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
    return this.customerReg.get('fullname')
  }

  get contact(){
    return this.customerReg.get('contact')
  }

  get address(){
    return this.customerReg.get('address')
  }

  get password(){
    return this.customerReg.get('password')
  }

  get email(){
    return this.customerReg.get('email')
  }

  get age(){
    return this.customerReg.get('age')
  }

  get conpassword(){
    return this.customerReg.get('conpassword')
  }


  //registration

  customerObj : Customer ={
    cid: '',
    cname: '',
    cprofile: '',
    cmobile: '',
    cemail: '',
    caddress: '',
    cage: '',
    cpassword: '',
    cconpassword: ''
  };

  cid : string = '';
  cname : string = '';
  cmobile : string = '';
  caddress : string = '';
  cpassword : string = '';
  cprofile : string = '';
  cemail : string = '';
  cage : string = '';
  cconpassword : string = '';

  constructor(private customer : CustomerService , private auth : AuthService,private dialogRef : MatDialog,private storage: AngularFireStorage, private firestore: AngularFirestore) {}
    
 

  

  resetForm() {
    this.cid  = '';
    this.cname  = '';
    this.cmobile  = '';
    this.caddress = '';
    this.cpassword  = '';
    this.cprofile  = '';
    this.cemail  = '';
    this.cage = '';
    this.cconpassword = '';
  }


  addCustomer() {
 
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
    const filePath = `Customers/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedImage);

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe((url) => {
          if (url) {
            this.customerObj.cprofile = url; // Save the image URL to the customerObj.pimage property

            // Now add the entire product object to Firestore
            this.customerObj.cid = this.firestore.createId(); // Generate a unique ID for the product
            this.customerObj.cname = this.cname;
            this.customerObj.cmobile = this.cmobile;
            this.customerObj.cemail = this.cemail;
            this.customerObj.caddress = this.caddress;
            this.customerObj.cage = this.cage;
            this.customerObj.cpassword = this.cpassword;
            this.customerObj.cconpassword = this.cconpassword;
            this.auth.register(this.cemail,this.cpassword);
            this.resetForm();
            this.customer.addCustomer(this.customerObj).then(() => {
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
