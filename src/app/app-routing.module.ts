import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { AdminComponent } from './admin/admin.component';
import { UpdateProductComponent } from './admin/update-product/update-product.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomePageComponent } from './home-page/home-page.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { RegisterComponent } from './register/register.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { ShopRegistrationComponent } from './shop-registration/shop-registration.component';
import { ShopePageComponent } from './shope-page/shope-page.component';


const routes: Routes = [
  {path:"", component: HomePageComponent},
  {path:"about", component: AboutPageComponent},
  {path:"product", component: ProductPageComponent},
  {path:"shop", component: ShopePageComponent},
  {path:"contactus", component: ContactUsComponent},
  {path:"customerReg", component: CustomerRegistrationComponent},
  {path:"ShopReg", component: ShopRegistrationComponent},
  {path:"forgotPass", component: ForgotPasswordComponent},
  {path:"updateproduct", component: UpdateProductComponent  },
  {path:"Invoice", component: InvoiceComponent  },
  {path:"paymentgateway", component: PaymentGatewayComponent  },
  {path:"feedback", component: FeedbackPageComponent  },
  {
    path:"admin", component:AdminComponent,
    loadChildren: () => 
    import('./admin/admin.module').then((m)=>m.AdminModule)
},
{path:"cart", component: CartComponent},

{path:"ShippingAdd", component: ShippingAddressComponent},
{path:"register", component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
