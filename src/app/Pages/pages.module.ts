import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../Shared/shared.module';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ServiceService } from '../Shared/Services/service.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { UserlistComponent } from './userlist/userlist.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  providers: [ServiceService],
  declarations: [CartComponent, RegisterAdminComponent, ProductlistComponent, ProductdetailComponent, HomeComponent, RegisterComponent, LoginComponent, AccountComponent, UserlistComponent, RegisterAdminComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [CartComponent, RegisterAdminComponent, ProductlistComponent, ProductdetailComponent, HomeComponent, RegisterComponent, LoginComponent, SharedModule]
})
export class PagesModule { }
