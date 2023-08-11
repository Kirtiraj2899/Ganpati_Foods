import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AppRoutingModule } from './app-routing.module';


import { HttpClientModule } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutPageComponent } from './about-page/about-page.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterPageComponent } from './footer-page/footer-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ShopePageComponent } from './shope-page/shope-page.component';


import { ScreenTrackingService, UserTrackingService, getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { CartComponent } from './cart/cart.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { FeedbackCardComponent } from './feedback-card/feedback-card.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { ProductInfoCardComponent } from './product-info-card/product-info-card.component';
import { RegisterComponent } from './register/register.component';
import { SearchPipe } from './search.pipe';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { ShopRegistrationComponent } from './shop-registration/shop-registration.component';
import { ThankYouComponent } from './thank-you/thank-you.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    AboutPageComponent,
    FooterPageComponent,
    ContactUsComponent,
    ProductPageComponent,
    ShopePageComponent,
    LoginPageComponent,
    AdminComponent,
    CustomerRegistrationComponent,
    ShopRegistrationComponent,
    ProductInfoCardComponent,
    FeedbackPageComponent,
    FeedbackCardComponent,
    SearchPipe,
    ShopCardComponent,
    CartComponent,
    ShippingAddressComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    PaymentGatewayComponent,
    NavbarUserComponent,
    InvoiceComponent,
    ImageSliderComponent,
    ThankYouComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    AdminModule,
    ReactiveFormsModule,
    FormsModule,
    GooglePayButtonModule,
    SlickCarouselModule,
    CarouselModule,
   
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule
    
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
