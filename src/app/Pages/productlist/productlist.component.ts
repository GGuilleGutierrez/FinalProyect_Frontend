import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormproductComponent } from 'src/app/Shared/formproduct/formproduct.component';
import { ProductdetailComponent } from '../productdetail/productdetail.component';
import { ServiceService } from '../../Shared/Services/service.service';
import { Product } from 'src/app/Shared/interfaces/product.interface';
import { ProductForm } from 'src/app/Shared/interfaces/productform';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent {
  constructor(public dialog: MatDialog, private service: ServiceService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  public products: any = []
  public searchProd: string = "";

  openDialogFormCreate() {
    const create: ProductForm = {
      canEdit: false
    }
    this.dialog.open(FormproductComponent, {
      width: "40%",
      data: create
    })
  }


  openDialogMore(product: Product) {
    this.dialog.open(ProductdetailComponent, {
      width: "45%",
      data: product
    })
  }

  getProducts() {
    this.service.getProds('http://localhost:3001').subscribe(resp => {
      this.products = resp;
      return this.products
    })
  }



}
