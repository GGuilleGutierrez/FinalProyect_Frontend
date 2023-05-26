import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/Pages/login/login.component';
import { ILog } from '../interfaces/login.interface';
import { AccountComponent } from 'src/app/Pages/account/account.component';
import { ServiceService } from '../Services/service.service';
import { Product } from '../interfaces/product.interface';
import decode from 'jwt-decode';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userLog!: ILog;
  sessionOn!: boolean;
  token = localStorage.getItem("token");
  user: any;
  isAdmin!: boolean;

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private service: ServiceService) { }
  
  listCart: Product[] = JSON.parse(localStorage.getItem('listCart') || '[]');
  product!: Product;
  badge: number = JSON.parse(localStorage.getItem('badge') || 'null');

  massageAddCartOk: string = "Agregaste éste producto al carrito!";
  massageAddCartRepeat: string = "+1";

  ngOnInit(): void {
    this.session(); 
    this.service.toCart.subscribe(data => {
      this.product = data.data;
      if(!this.listCart.includes(this.product)){
        this.listCart.push(this.product);
        localStorage.setItem("listCart", JSON.stringify(this.listCart));
        this.badge = this.listCart.length;
        localStorage.setItem("badge", JSON.stringify(this.badge));
        this._snackBar.open(this.massageAddCartOk)._dismissAfter(3000);
      } else {
        this.product.amount+= 1;
        this._snackBar.open(this.massageAddCartRepeat)._dismissAfter(5000);
      }
    }) 
}

  openDialogLogin() {
    this.dialog.open(LoginComponent, {
      width: "30%"
    })
  }

  openDialogAccount() {
    this.dialog.open(AccountComponent, {
      width: "35%",
      data: this.userLog
    })
  }

  session() {
    if (this.token) {
      this.sessionOn = true;
      this.user = decode(JSON.stringify(this.token))
      this.userLog = this.user.userLog;
      if (this.userLog.role == "user") {
        this.isAdmin = false;
      } else {
        this.isAdmin = true;
      }
    } else {
      this.sessionOn = false;
    }
  }
}
