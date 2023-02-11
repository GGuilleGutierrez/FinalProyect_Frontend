import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../Shared/shared.module';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ServiceService } from '../Shared/Services/service.service';



@NgModule({
  providers: [ServiceService],
  declarations: [ProductlistComponent, ProductdetailComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ProductlistComponent, ProductdetailComponent, SharedModule]
})
export class PagesModule { }
