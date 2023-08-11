import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { CartService } from '../shared/cart.service';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css']
})
export class ShopCardComponent {

  productsList : Product[] = [];
  searchText = '';
  showMore = false;

  constructor(private product : ProductService , private cart : CartService , private router : ActivatedRoute){  }
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
      
      this.productsList.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.psellprice})
        
      });
    }, err =>{
        alert('Error while fetching product data');
    })
  }

  addToCart(product : Product) {
    this.cart.addToCart(product);
  }

}
