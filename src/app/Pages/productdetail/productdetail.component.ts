import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from 'src/app/Shared/Services/service.service';
import { ConfirmdeleteComponent } from 'src/app/Shared/confirmdelete/confirmdelete.component';
import { FormproductComponent } from 'src/app/Shared/formproduct/formproduct.component';
import { ILog } from 'src/app/Shared/interfaces/login.interface';
import { Product } from 'src/app/Shared/interfaces/product.interface';
import { ProductForm } from 'src/app/Shared/interfaces/productform';
import decode from 'jwt-decode';
@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})

export class ProductdetailComponent {

  userLog!: ILog;
  sessionOn!: boolean;
  token = localStorage.getItem("token");
  user: any;
  isAdmin!: boolean;

  massageDeleteOk: string = "Producto eliminado exitosamente."
  massageError: string = "Ups! Ha ocurrido un problema. Intente nuevamente."

  product!: Product;

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: Product, private service: ServiceService) {
    this.product = data;
  }

  ngOnInit(): void {
    this.ctrlRole()
  }

  openDialogConfirmDelete() {
    this.dialog.open(ConfirmdeleteComponent, {
      width: "35%"
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.deleteProd()
      }
    })
  }

  openDialogFormEdit() {
    const productEdit: ProductForm = {
      canEdit: true,
      ...this.product
    }
    this.dialog.open(FormproductComponent, {
      width: "40%",
      data: productEdit
    })
  }

  deleteProd() {
    this.service.deleteProducts(`http://localhost:3001/delete/${this.product.id}`).subscribe({
      next: (res) => {
        this._snackBar.open(this.massageDeleteOk)._dismissAfter(2000)
          , setTimeout(() => (window.location.reload()), 1500);
      }, error: () => {
        this._snackBar.open(this.massageError)._dismissAfter(3000)
      }
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
}
