import { Component } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/shared/customer.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-admin-customer-view',
  templateUrl: './admin-customer-view.component.html',
  styleUrls: ['./admin-customer-view.component.css']
})
export class AdminCustomerViewComponent {

  customerList : Customer[] = [];

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

  constructor(private customer : CustomerService){  }

  ngOnInit(): void{
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customer.getAllCustomer().subscribe(res =>{

      this.customerList = res.map((e: any) =>{
        const data = e.payload.doc.data();
        data.pid = e.payload.doc.id;
        return data;
      })
    }, err =>{
        alert('Error while fetching product data');
    })
  }

 

  deleteCustomer(customer : Customer) {
    if(window.confirm('Are you sure you want to delete' +customer.cname+'?')){
      this.customer.deleteCustomer(customer);
    }
    localStorage.removeItem("id");
  }

  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.customerList);
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
