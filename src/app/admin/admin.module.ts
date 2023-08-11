import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AdminCustomerViewComponent } from './admin-customer-view/admin-customer-view.component';

import { AddProductComponent } from './add-product/add-product.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminShopViewComponent } from './admin-shop-view/admin-shop-view.component';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { ContentComponent } from './content/content.component';
import { FeedbackViewComponent } from './feedback-view/feedback-view.component';
import { ProductCategorComponent } from './product-categor/product-categor.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { SearchPipe } from './search.pipe';
import { UpdateProductComponent } from './update-product/update-product.component';


@NgModule({

  declarations: [
    AdminCustomerViewComponent,
  
    AdminHeaderComponent,
    AdminSidenavComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    AddProductComponent,
    ProductViewComponent,
    AdminShopViewComponent,
    ProductCategorComponent,
    FeedbackViewComponent,
    SearchPipe,
    AddSupplierComponent,
    UpdateProductComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],

  exports: [
    AdminCustomerViewComponent,
    AdminSidenavComponent,
    AdminHeaderComponent,
    AddProductComponent,
    ProductViewComponent,
    AdminShopViewComponent,
    ProductCategorComponent,
    FeedbackViewComponent,
    AddSupplierComponent,
    ContentComponent

  ]
})
export class AdminModule { }
