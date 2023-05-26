import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { RegisterComponent } from './Pages/register/register.component';
import { ProductlistComponent } from './Pages/productlist/productlist.component';
import { UserlistComponent } from './Pages/userlist/userlist.component';
import { RegisterAdminComponent } from './Pages/register-admin/register-admin.component';
import { CartComponent } from './Pages/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'products',
    component: ProductlistComponent
  },
  {
    path: 'users',
    component: UserlistComponent
  },
  {
    path: 'admin',
    component: RegisterAdminComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
