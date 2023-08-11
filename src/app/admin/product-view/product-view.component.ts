import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/shared/product.service';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {

  productsList : Product[] = [];
  searchText = '';

  url="";
  onselectFile(e:any) { 
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event : any) =>{
        this.url = event.target.result;
     }
    }
  }

  constructor(private product : ProductService,private storage: AngularFireStorage,private db: AngularFireDatabase, private router: Router){  }

  ngOnInit(): void{
    this.getAllProduct();
  }

  getAllProduct() {
    this.product.getAllProduct().subscribe(res =>{

      this.productsList = res.map((e: any) =>{
        const data = e.payload.doc.data();
        data.pid = e.payload.doc.id;
        return data;
      })
    }, err =>{
        alert('Error while fetching product data');
    })
  }

  deleteProduct(product : Product) {
    if(window.confirm('Are you sure you want to delete' +product.pwgt+'?')){
      this.product.deleteProduct(product);
    }
  }

  editProduct(product : Product, index:number){
    
    console.log(this.productsList[index]);
    
  }

   onEditProduct(product: Product) {
   // Store the selected product in the shared service
   this.product.setSelectedProduct(product);

    // Navigate to the product update form with the productId as a parameter
    this.router.navigate(['/updateproduct', product]);
  }

  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.productsList);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, 'products.xlsx');
  }

  saveExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const url: string = window.URL.createObjectURL(data);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
