import { Component } from '@angular/core';
import { ProdCategory } from 'src/app/model/prod-category';
import { CategoryService } from 'src/app/shared/category.service';

@Component({
  selector: 'app-product-categor',
  templateUrl: './product-categor.component.html',
  styleUrls: ['./product-categor.component.css']
})
export class ProductCategorComponent {

  

  prodcategoryObj : ProdCategory ={
    catid: '',
    catname: '',
  };

  catid : string = '';
  catname : string = '';
 
  prodCategoryList : ProdCategory[] = [];


  constructor(private category : CategoryService){  }

  

  

  resetForm() {
    this.catid  = '';
    this.catname  = '';
  }

  addProdCategory() {
    if(this.catname == ''){
      alert('Fill all inputes fields');
    }
    else{

    this.prodcategoryObj.catid = '';
    this.prodcategoryObj.catname = this.catname;
    

    this.category.addProdCategory(this.prodcategoryObj);
    this.resetForm();
    alert('data insert successfully')
  }
  }

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

  deleteProdCaategory(prodCategory : ProdCategory) {
    if(window.confirm('Are you sure you want to delete' +prodCategory.catname+'?')){
      this.category.deleteProdCaategory(prodCategory);
    }
  }

}
