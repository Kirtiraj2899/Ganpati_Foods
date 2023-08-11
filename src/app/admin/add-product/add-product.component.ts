import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { ProdCategory } from 'src/app/model/prod-category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/shared/category.service';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  //image view

  url="";
  selectedImage : any=null;
  isSubmitted : boolean =false;
  

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
  
  productObj : Product ={
    pid: '',
    pwgt: '',
    pcompanyname: '',
    pcategory: '',
    pdescription: '',
    psellprice: '',
    ppurchprice: '',
    pimage: '',
    pquantity: '',
  };

  pid : string = '';
  pwgt : string = '';
  pcompanyname : string = '';
  pcategory : string = '';
  pdescription : string = '';
  psellprice : string = '';
  ppurchprice : string = '';
  pimage : string = '';
  pquantity : string = '';

  constructor(private product : ProductService , private category : CategoryService ,private storage: AngularFireStorage, private firestore: AngularFirestore){  }

  

  resetForm() {
    this.pid  = '';
    this.pwgt  = '';
    this.pcompanyname  = '';
    this.pcategory = '';
    this.pdescription  = '';
    this.psellprice  = '';
    this.ppurchprice  = '';
    this.pimage = '';
    this.pquantity = '';
  }

  addProduct() {
    if(this.pwgt == '' || this.pcompanyname == '' || this.pcategory == '' || this.pdescription == '' || this.psellprice == '' || this.ppurchprice == '' || this.pquantity == ''){
      alert('Fill all inputes fields');
    }
    else{

    // this.productObj.pid = '';
    // this.productObj.pwgt = this.pwgt;
    // this.productObj.pcompanyname = this.pcompanyname;
    // this.productObj.pcategory = this.pcategory;
    // this.productObj.pdescription = this.pdescription;
    // this.productObj.psellprice = this.psellprice;
    // this.productObj.ppurchprice = this.ppurchprice;
    // this.productObj.pquantity = this.pquantity;
    

    // this.product.addProduct(this.productObj);
    // this.resetForm();
    // alert('data insert successfully')
    // this.onFileSelected(null);

    // const n = Date.now();
    //   const filePath = `Products/${n}`;
    //   const fileRef = this.storage.ref(filePath);
    //   const task = this.storage.upload(filePath, this.selectedImage);

    //   task.snapshotChanges().pipe(
    //     finalize(() => {
    //       this.downloadURL = fileRef.getDownloadURL();
    //       this.downloadURL.subscribe((url) => {
    //         if (url) {
    //           this.productObj.pimage = url; // Save the image URL to the productObj.pimage property
    //           this.product.addProduct(this.productObj).then(()=>{
    //           this.resetForm();
    //           alert('Data inserted successfully');
    //         }).catch((error) => {
    //           console.error('Error saving product details:', error);
    //         });
    //       }
    //     });
    //   })
    // ).subscribe((url) => {
    //   if (url) {
    //     console.log(url);
    //     }
    //   });

    const n = Date.now();
    const filePath = `Products/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedImage);

    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe((url) => {
          if (url) {
            this.productObj.pimage = url; // Save the image URL to the productObj.pimage property

            // Now add the entire product object to Firestore
            this.productObj.pid = this.firestore.createId(); // Generate a unique ID for the product
            this.productObj.pwgt = this.pwgt;
            this.productObj.pcompanyname = this.pcompanyname;
            this.productObj.pcategory = this.pcategory;
            this.productObj.pdescription = this.pdescription;
            this.productObj.psellprice = this.psellprice;
            this.productObj.ppurchprice = this.ppurchprice;
            this.productObj.pquantity = this.pquantity;

            this.product.addProduct(this.productObj).then(() => {
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
  }
  

  updateProduct() {

  }

  prodCategoryList : ProdCategory[] = [];

  ngOnInit(): void{
    this.getProdCaategory();
  }

  getProdCaategory() {
    this.category.getAllProdCaategory().subscribe(res =>{

      this.prodCategoryList = res.map((e: any) =>{
        const data = e.payload.doc.data();
        data.catid = e.payload.doc.id;
        return data;
      })
    }, err =>{
        alert('Error while fetching product data');
    })
  }


 
  
  title = "cloudsSorage";
  selectedFile : any=null;
  fb:any;
  downloadURL: Observable<string> | undefined;
 
  // onFileSelected(event:any) {
  //   var n = Date.now();
  //   const file = event.target.files[0];
  //   const filePath = `Products/${n}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(`Products/${n}`, file);
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
  //   const filePath = `Products/${n}`;
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

 
  // Function to save the image URL to Firestore
  // saveImageToFirestore(filePath: string, imageUrl: string) {
  //   this.firestore.collection('/Products').add({
  //     filePath: filePath,
  //     imageUrl: imageUrl
  //   }).then((docRef) => {
  //     console.log('Image URL saved to Firestore:', docRef.id);
  //   }).catch((error) => {
  //     console.error('Error saving image URL:', error);
  //   });
  // }
  
  
}
