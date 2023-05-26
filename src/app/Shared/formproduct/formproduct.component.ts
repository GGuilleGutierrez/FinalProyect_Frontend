import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductForm } from '../interfaces/productform';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from '../Services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formproduct',
  templateUrl: './formproduct.component.html',
  styleUrls: ['./formproduct.component.css']
})

export class FormproductComponent {
  formProduct!: FormGroup;
  product!: ProductForm;

  massageAddOk: string = "Producto añadido exitosamente."
  massageNoValid: string = "Porfavor, revise todos los campos requeridos."
  massageEditOk: string = "Producto editado exitosamente."
  massageError: string = "Ups! Ha ocurrido un problema. Intente nuevamente."

  constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: ProductForm, private service: ServiceService, private _snackBar: MatSnackBar) {
    this.product = data;
  }

  ngOnInit(): void {

    this.formProduct = this.formBuilder.group({
      name: ["", Validators.required],
      descript: ["", Validators.required],
      price: ["", Validators.required],
      img: ["", Validators.required],
      stock: ["", Validators.required],
      amount: 0
    })

    if (this.product.canEdit) {
      this.formProduct.setValue({
        "name": this.product.name,
        "descript": this.product.descript,
        "price": this.product.price,
        "img": this.product.img,
        "stock": this.product.stock,
        "amount": 0
      })
    }

  }

  createProd() {
    if (this.formProduct.valid) {
      this.service.addProducts('http://localhost:3001/create', this.formProduct.value).subscribe({
        next: (res) => {
          this._snackBar.open(this.massageAddOk)._dismissAfter(3000)
            , setTimeout(() => (window.location.reload()), 3000);
        }, error: () => {
          this._snackBar.open(this.massageError)._dismissAfter(3000)
        }
      })
    } else {
      this._snackBar.open(this.massageNoValid)._dismissAfter(3000)
    }
  }

  editProd() {
    if (this.formProduct.valid) {
      this.service.editProducts(`http://localhost:3001/update/${this.product.id}`, this.formProduct.value)
        .subscribe({
          next: (res) => {
            this._snackBar.open(this.massageEditOk)._dismissAfter(3000)
              , setTimeout(() => (window.location.reload()), 3000);
          }, error: () => {
            this._snackBar.open(this.massageError)._dismissAfter(3000)
          }
        })
    } else {
      this._snackBar.open(this.massageNoValid)._dismissAfter(3000)
    }

  }
}



