import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from 'src/app/Shared/Services/service.service';
import { User } from 'src/app/Shared/interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formRegister!: FormGroup;
  user!: User;

  massageRegOk: string = "Se ha registrado exitosamente."
  massageNoValid: string = "Porfavor, revise todos los campos requeridos."
  massageError: string = "Ups! Ha ocurrido un problema. Intente nuevamente."
  massagePasswNoValid: string = "Las contraseñas deben coincidir."

  constructor(private formBuilder: FormBuilder, private service: ServiceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.formRegister = this.formBuilder.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      birth: ["", Validators.required],
      phone: ["", Validators.required],
      role: ["", Validators.required],
      password: ["", Validators.required],
      confirmpassword: ["", Validators.required]
    })
  }

  register() {
    if (this.formRegister.valid) {
      this.user = this.formRegister.value
      if (this.user.password == this.user.confirmpassword) {
        this.service.register('http://localhost:3001/register', this.user).subscribe({
          next: () => {
            this._snackBar.open(this.massageRegOk)._dismissAfter(3000)
              , setTimeout(() => (window.location.href = "http://localhost:4200/"), 3000);
          }, error: () => {
            this._snackBar.open(this.massageError)._dismissAfter(3000)
          }
        })
      } else {
        this._snackBar.open(this.massagePasswNoValid)._dismissAfter(3000)
      }
    } else {
      this._snackBar.open(this.massageNoValid)._dismissAfter(3000)
    }
  }
}