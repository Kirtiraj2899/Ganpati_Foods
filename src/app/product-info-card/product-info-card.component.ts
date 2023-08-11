import { Component } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-info-card',
  templateUrl: './product-info-card.component.html',
  styleUrls: ['./product-info-card.component.css']
})
export class ProductInfoCardComponent {

  

  productsList : Product[] = [];
  showMore = false;

  constructor(private product : ProductService){  }
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
}
