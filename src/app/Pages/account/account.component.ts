import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from 'src/app/Shared/Services/service.service';
import { ConfirmDeleteAccountComponent } from 'src/app/Shared/confirmDeleteAccount/confirm-delete-account.component';
import { ILog } from 'src/app/Shared/interfaces/login.interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  userLog!: ILog;

  massageLogOutOk: string = "Has cerrado sesión exitosamente."
  massageDeleteUserOk: string = "Se ha eliminado la cuenta exitosamente."
  massageError: string = "Ups! Ha ocurrido un error. Intente nuevamente..."

  constructor(private service: ServiceService, private _snackBar: MatSnackBar, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: ILog) {
    this.userLog = data;
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("listCart");
    localStorage.removeItem("badge");
    this._snackBar.open(this.massageLogOutOk)._dismissAfter(3000),
      setTimeout(() => (window.location.href="http://localhost:4200"), 3000)
  }

  openDialogConfirmDeleteAccount() {
    this.dialog.open(ConfirmDeleteAccountComponent, {
      width: "30%"
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.deleteAccount()
      }
    })
  }

  deleteAccount() {
    this.service.deleteUser(`http://localhost:3001/deleteUser/${this.userLog.id}`).subscribe({
      next: () => {
        localStorage.removeItem("token")
        this._snackBar.open(this.massageDeleteUserOk)._dismissAfter(2000)
          , setTimeout(() => (window.location.reload()), 2000);
      }, error: () => {
        this._snackBar.open(this.massageError)._dismissAfter(3000)
      }
    })
  }
}