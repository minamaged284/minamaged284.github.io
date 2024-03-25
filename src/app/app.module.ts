import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthService } from './auth.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VarifyCodeComponent } from './varify-code/varify-code.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CartComponent } from './cart/cart.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { NotFOundComponent } from './not-found/not-found.component';
import { SearchPipe } from './search.pipe';
import { LoadingInterceptor } from './loading.interceptor';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryProductsPipePipe } from './category-products-pipe.pipe';
import { ToastrModule } from 'ngx-toastr';
import { AddHeaderInterceptor } from './add-header.interceptor';
import { BrandDetailsComponent } from './brand-details/brand-details.component';
import { BrandProductsPipePipe } from './brand-products-pipe.pipe';
import { PaymentComponent } from './payment/payment.component';
import { AllordersComponent } from './allorders/allorders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ForgotPasswordComponent,
    VarifyCodeComponent,
    ResetPasswordComponent,
    CartComponent,
    WishListComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    NotFOundComponent,
    SearchPipe,
    ProductDetailsComponent,
    CategoryDetailsComponent,
    CategoryProductsPipePipe,
    BrandDetailsComponent,
    BrandProductsPipePipe,
    PaymentComponent,
    AllordersComponent,
    OrderDetailsComponent,
    
    
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
    ,ReactiveFormsModule,HttpClientModule,MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxSpinnerModule,
    CarouselModule,
    RouterModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),

  ],
  providers: [AuthService,
    {provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:AddHeaderInterceptor,multi:true},Title
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
