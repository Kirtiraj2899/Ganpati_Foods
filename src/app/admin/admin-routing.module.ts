import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { AdminCustomerViewComponent } from './admin-customer-view/admin-customer-view.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminShopViewComponent } from './admin-shop-view/admin-shop-view.component';
import { FeedbackViewComponent } from './feedback-view/feedback-view.component';
import { ProductCategorComponent } from './product-categor/product-categor.component';
import { ProductViewComponent } from './product-view/product-view.component';

const routes: Routes = [ 
  
  {path:'' , component:AdminDashboardComponent},
  {path:'admincustomer' , component:AdminCustomerViewComponent},
  {path:'addproduct' , component:AddProductComponent},
  {path:'addSupplier' , component:AddSupplierComponent},
  {path:'productview' , component:ProductViewComponent},
  {path:'shopview' , component:AdminShopViewComponent},
  {path:'prodCat' , component:ProductCategorComponent},
  {path:'feedbackview' , component:FeedbackViewComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
