import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormproductComponent } from 'src/app/Shared/formproduct/formproduct.component';
import { ProductdetailComponent } from '../productdetail/productdetail.component';
import { ServiceService } from '../../Shared/Services/service.service';
import { Product } from 'src/app/Shared/interfaces/product.interface';
import { ProductForm } from 'src/app/Shared/interfaces/productform';
import { ILog } from 'src/app/Shared/interfaces/login.interface';
import decode from 'jwt-decode';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent{
  constructor(public dialog: MatDialog, private service: ServiceService) { }

  userLog!: ILog;
  token = localStorage.getItem("token");
  user: any;
  isAdmin!: boolean;

  ngOnInit(): void {
    // this.getItems();
    this.getProducts();
    this.ctrlRole();
  }

  products: any = [];
  searchProd: string = "";

  openDialogFormCreate() {
    const create: ProductForm = {
      canEdit: false, 
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
    this.service.getProds('http://localhost:3001').subscribe(res => {
      this.products = res;
    })
  }

  ctrlRole() {
    this.user = decode(JSON.stringify(this.token))
    this.userLog = this.user.userLog;
    if (this.userLog.role == "user") {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
  }

  // currentPag = 0;
  // pageSize = 12;
  // totalItems = 0;
  // itemsPage = []; 

  // onPageChange(event: PageEvent){
  //   this.getItems(); 
  //   this.currentPag = event.pageIndex;
  //   this.pageSize = event.pageSize;
  // }

  // getItems(){
  //   this.getProducts();
  //   const startIndex = this.currentPag * this.pageSize;
  //   const endIndex = startIndex + this.pageSize;
  //   this.itemsPage = this.products.slice(startIndex, endIndex);
  //   this.totalItems = this.products.length;
  // }
}
