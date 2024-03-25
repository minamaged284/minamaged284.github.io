import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VarifyCodeComponent } from './varify-code/varify-code.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { CartComponent } from './cart/cart.component';
import { authGuardGuard } from './auth-guard.guard';
import { NotFOundComponent } from './not-found/not-found.component';
import { loggedGuardGuard } from './logged-guard.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { BrandDetailsComponent } from './brand-details/brand-details.component';
import { PaymentComponent } from './payment/payment.component';
import { AllordersComponent } from './allorders/allorders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"home", canActivate:[authGuardGuard], component:HomeComponent},
  {path:"register",canActivate:[loggedGuardGuard] , component:RegisterComponent},
  {path:"login",canActivate:[loggedGuardGuard] , component:LoginComponent},
  {path:"forgotPassword",canActivate:[loggedGuardGuard] , component:ForgotPasswordComponent},
  {path:"varifyCode",canActivate:[loggedGuardGuard] , component:VarifyCodeComponent},
  {path:"resetPassword",canActivate:[loggedGuardGuard] , component:ResetPasswordComponent},
  {path:"cart", canActivate:[authGuardGuard] , component:CartComponent},
  {path:"wishList", canActivate:[authGuardGuard] , component:WishListComponent},
  {path:"products", canActivate:[authGuardGuard] , component:ProductsComponent},
  {path:"categories", canActivate:[authGuardGuard] , component:CategoriesComponent},
  {path:"brands", canActivate:[authGuardGuard] , component:BrandsComponent},
  {path:"productDetails/:id",canActivate:[authGuardGuard] ,  component:ProductDetailsComponent},
  {path:"CategoryDetails/:id",canActivate:[authGuardGuard] ,  component:CategoryDetailsComponent},
  {path:"BrandDetails/:id",canActivate:[authGuardGuard] ,  component:BrandDetailsComponent},
  {path:"payment/:id",canActivate:[authGuardGuard] ,  component:PaymentComponent},
  {path:"allorders",canActivate:[authGuardGuard] ,  component:AllordersComponent},
  {path:"orderDetails/:id/:userId",canActivate:[authGuardGuard] ,  component:OrderDetailsComponent},







  {path:"**" , component:NotFOundComponent},






];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
