import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import{FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { Pagenotfound404Component } from './pagenotfound404/pagenotfound404.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { FooterComponent } from './footer/footer.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrderComponent } from './my-order/my-order.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    Pagenotfound404Component,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    FooterComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    CartPageComponent,
    CheckoutComponent,
    MyOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
