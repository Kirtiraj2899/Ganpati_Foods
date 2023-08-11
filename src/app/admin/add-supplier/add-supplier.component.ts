import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Supplier } from 'src/app/model/supplier';
import { SupplierService } from 'src/app/shared/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent {

   // validation

   supplierReg=new FormGroup({
    fullname:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    contact:new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[9]+[0-9]{9}$")]),
    address:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9!@#$%^_&*()]+')]),
    password:new FormControl('',[Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{4,}')]),
    email:new FormControl('',[Validators.required, Validators.email]),
    companyname:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    conpassword:new FormControl('',[Validators.required])
  })

  get fullname(){
    return this.supplierReg.get('fullname')
  }

  get contact(){
    return this.supplierReg.get('contact')
  }

  get address(){
    return this.supplierReg.get('address')
  }

  get password(){
    return this.supplierReg.get('password')
  }

  get email(){
    return this.supplierReg.get('email')
  }

  get companyname(){
    return this.supplierReg.get('companyname')
  }

  get conpassword(){
    return this.supplierReg.get('conpassword')
  }

  constructor( private supplier:SupplierService ){}


  // add supplier
  supplierObj : Supplier ={
    supid: '',
    supname: '',
    supprofile: '',
    supmobile: '',
    supemail: '',
    supaddress: '',
    supcompanyname: '',
    suppassword: '',
    supconpassword: ''
  };

  supid : string = '';
  supname : string = '';
  supmobile : string = '';
  supaddress : string = '';
  suppassword : string = '';
  supprofile : string = '';
  supemail : string = '';
  supcompanyname : string = '';
  supconpassword : string = '';


  resetForm() {
    this.supid  = '';
    this.supname  = '';
    this.supmobile  = '';
    this.supaddress = '';
    this.suppassword  = '';
    this.supprofile  = '';
    this.supemail  = '';
    this.supcompanyname = '';
    this.supconpassword = '';
  }


  addSupplier() {
 
    this.supplierObj.supid = '';
    this.supplierObj.supname = this.supname;
    this.supplierObj.supmobile = this.supmobile;
    this.supplierObj.supaddress = this.supaddress;
    this.supplierObj.suppassword = this.suppassword;
    this.supplierObj.supprofile = this.supprofile;
    this.supplierObj.supemail = this.supemail;
    this.supplierObj.supcompanyname = this.supcompanyname;
    this.supplierObj.supconpassword = this.supconpassword;
    
    window.alert("Data Inserted Succefully")
    this.supplier.addSupplier(this.supplierObj);
    this.resetForm();
  }

  updateCustomer() {

  }
  
}
