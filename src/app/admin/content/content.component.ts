import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { ContentManagement } from 'src/app/model/content-management';
import { AuthService } from 'src/app/shared/auth.service';
import { ContentManagementService } from 'src/app/shared/content-management.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  showPwd:any;
  isSubmitted : boolean = false;

  url="";
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


  // validation



 

 
  //registration

  contentObj : ContentManagement ={
    contentid: '',
    contenMobile: '',
    contentEmail: '',
    contentAddress: '',
    founderimage: '',
    cofounderimage: '',
  };

  contentid : string = '';
  contentMobile : string = '';
  contentEmail : string = '';
  contentAddress : string = '';
  founderimage : string = '';
  cofounderimage : string = '';

  constructor(private content : ContentManagementService , private auth : AuthService,private storage: AngularFireStorage, private firestore: AngularFirestore) {}
    
 

  

  resetForm() {
    this.contentid  = '';
    this.contentMobile  = '';
    this.contentEmail  = '';
    this.contentAddress = '';
    this.founderimage  = '';
    this.cofounderimage  = '';
  }


  addContent() {
 
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
    const filePath = `Content/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedImage);

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe((url) => {
          if (url) {
            this.contentObj.founderimage = url; // Save the image URL to the customerObj.pimage property
            this.contentObj.cofounderimage = url; 

            // Now add the entire product object to Firestore
            this.contentObj.contentid = this.firestore.createId(); // Generate a unique ID for the product
            this.contentObj.contenMobile = this.contentMobile;
            this.contentObj.contentEmail = this.contentEmail;
            this.contentObj.contentAddress = this.contentAddress;
            this.contentObj.founderimage = this.founderimage;
            this.contentObj.cofounderimage = this.cofounderimage;
            this.resetForm();
            this.content.addContent(this.contentObj).then(() => {
              this.resetForm();
              alert('Data inserted successfully');
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
 
  onFileSelected(event: any) {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `Content/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe((url) => {
          if (url) {
            this.fb = url;
            this.saveImageToFirestore(filePath, this.fb); // Save the image URL to Firestore
          }
        });
      })
    ).subscribe((url) => {
      if (url) {
        console.log(url);
      }
    });
  }

  // Function to save the image URL to Firestore
  saveImageToFirestore(filePath: string, imageUrl: string) {
    this.firestore.collection('Customers').add({
      filePath: filePath,
      imageUrl: imageUrl
    }).then((docRef) => {
      console.log('Image URL saved to Firestore:', docRef.id);
    }).catch((error) => {
      console.error('Error saving image URL:', error);
    });
  }
}
