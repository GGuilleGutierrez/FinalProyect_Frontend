import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ServiceService } from 'src/app/Shared/Services/service.service';
import { HeaderComponent } from 'src/app/Shared/header/header.component';
import { Login } from 'src/app/Shared/interfaces/login.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin!: FormGroup;
  userLogin!: Login;
  token!: any;

  massageLogOk: string = "Ingresando a su cuenta..."
  massageNoValid: string = "Porfavor, revise todos los campos requeridos."
  massageError: string = "Ups! Ha ocurrido un problema. Intente nuevamente."

  constructor(
    private service: ServiceService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<HeaderComponent>
  ) { }

  ngOnInit(): void {

    this.formLogin = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })

  }

  login() {
    if (this.formLogin.valid) {
      this.userLogin = this.formLogin.value
      this.service.login('http://localhost:3001/login', this.userLogin).subscribe({
        next: (res) => {
          this.token = res;
          localStorage.setItem("token", JSON.stringify(this.token))
          this._snackBar.open(this.massageLogOk)._dismissAfter(3000),
            setTimeout(() => window.location.reload(), 3000)
        }, error: () => {
          this._snackBar.open(this.massageError)._dismissAfter(3000)
        }
      })
    } else {
      this._snackBar.open(this.massageNoValid)._dismissAfter(3000)
    }
  }
}
