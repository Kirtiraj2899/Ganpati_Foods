import { Component } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ProdCategory } from 'src/app/model/prod-category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/shared/category.service';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  productId: string | null = null;
  product: Product | null = null;
  prodCategoryList: ProdCategory[] = [];
  url = '';
  selectedImage: any = null;
  isSubmitted: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private category: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.getProductById(this.productId);
      }
    });
    this.getProdCategory();
  }

  onselectFile(e: any) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.selectedImage = e.target.files[0];
    } else {
      this.url = '';
      this.selectedImage = null;
    }
  }

  getProductById(productId: string) {
    this.productService.getProductById(productId).subscribe((product) => {
      this.product = product;
      this.updateFormFields();
    });
  }

  updateFormFields() {
    if (this.product) {
      this.pwgt = this.product.pwgt;
      this.pcompanyname = this.product.pcompanyname;
      this.pcategory = this.product.pcategory;
      this.pdescription = this.product.pdescription;
      this.psellprice = this.product.psellprice;
      this.ppurchprice = this.product.ppurchprice;
      this.url = this.product.pimage;
      this.pquantity = this.product.pquantity;
    }
  }

  prodCategory: string = '';
  pwgt: string = '';
  pcompanyname: string = '';
  pcategory: string = '';
  pdescription: string = '';
  psellprice: string = '';
  ppurchprice: string = '';
  pimage: string = '';
  pquantity: string = '';

  resetForm() {
    this.pwgt = '';
    this.pcompanyname = '';
    this.pcategory = '';
    this.pdescription = '';
    this.psellprice = '';
    this.ppurchprice = '';
    this.pimage = '';
    this.pquantity = '';
  }

  getProdCategory() {
    this.category['getAllProdCategory']().subscribe(
      (res: DocumentChangeAction<ProdCategory>[]) => { // Add the type for 'res'
        this.prodCategoryList = res.map((e: DocumentChangeAction<ProdCategory>) => {
          const data = e.payload.doc.data();
          data.catid = e.payload.doc.id;
          return data;
        });
      },
      (err:any) => {
        alert('Error while fetching product data');
      }
    );
  }

  updateProduct() {
    if (
      this.pwgt === '' ||
      this.pcompanyname === '' ||
      this.pcategory === '' ||
      this.pdescription === '' ||
      this.psellprice === '' ||
      this.ppurchprice === '' ||
      this.pquantity === ''
    ) {
      alert('Fill all input fields');
    } else {
      const updatedProduct: Product = {
        pid: this.productId!,
        pwgt: this.pwgt,
        pcompanyname: this.pcompanyname,
        pcategory: this.pcategory,
        pdescription: this.pdescription,
        psellprice: this.psellprice,
        ppurchprice: this.ppurchprice,
        pimage: this.url,
        pquantity: this.pquantity,
      };

      this.productService.updateProduct(this.productId!, updatedProduct).then(
        () => {
          this.resetForm();
          alert('Product updated successfully');
        },
        (error) => {
          console.error('Error updating product details:', error);
        }
      );
    }
  }


   
}
