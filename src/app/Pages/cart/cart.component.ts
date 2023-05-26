import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from 'src/app/Shared/Services/service.service';
import { Product } from 'src/app/Shared/interfaces/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  listCart: Product[] = JSON.parse(localStorage.getItem('listCart') || '[]');
  product!: Product;
  badge!: number;

  constructor(public dialog: MatDialog, private service: ServiceService) { }

  ngOnInit(): void {
 }

 deleteProdFromCart(product: Product){
  this.listCart = this.listCart.filter(prod => prod!= product);
  localStorage.setItem("listCart", JSON.stringify(this.listCart));
  this.badge = this.listCart.length;
  localStorage.setItem("badge", JSON.stringify(this.badge));
  window.location.reload();
}  

subtractProd(product: Product){
  product.amount--;
}

addProd(product: Product){
  product.amount++;
}

total!: number;

calcTotal(){
  this.total = this.listCart.reduce(function(acc, product){
    return acc + (product.price*product.amount);},0)
    return this.total;
  }

buyCart(){
  this.service.buy("http://localhost:3001/buy", this.listCart);
}

}