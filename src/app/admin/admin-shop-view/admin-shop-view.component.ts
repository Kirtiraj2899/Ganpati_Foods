import { Component } from '@angular/core';
import { Shop } from 'src/app/model/shop';
import { ShopService } from 'src/app/shared/shop.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-admin-shop-view',
  templateUrl: './admin-shop-view.component.html',
  styleUrls: ['./admin-shop-view.component.css']
})
export class AdminShopViewComponent {

  shopList : Shop[] = [];

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

  constructor(private shop : ShopService){  }

  ngOnInit(): void{
    this.getAllShop();
  }

  getAllShop() {
    this.shop.getAllShop().subscribe(res =>{

      this.shopList = res.map((e: any) =>{
        const data = e.payload.doc.data();
        data.pid = e.payload.doc.id;
        return data;
      })
    }, err =>{
        alert('Error while fetching product data');
    })
  }

  deleteShop(shop : Shop) {
    if(window.confirm('Are you sure you want to delete' +shop.sname+'?')){
      this.shop.deleteShop(shop);
    }
  }

  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.shopList);
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
