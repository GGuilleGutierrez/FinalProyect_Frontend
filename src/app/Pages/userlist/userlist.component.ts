import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from 'src/app/Shared/Services/service.service';
import { ConfirmDeleteAccountComponent } from 'src/app/Shared/confirmDeleteAccount/confirm-delete-account.component';
import { User } from 'src/app/Shared/interfaces/user.interface';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {

  massageDeleteUserOk: string = "Se ha eliminado la cuenta exitosamente."
  massageError: string = "Ups! Ha ocurrido un error. Intente nuevamente..."

  constructor(private service: ServiceService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  users: any = [];

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.service.getUsers('http://localhost:3001/users').subscribe(res => {
      this.users = res;
      return this.users
    })
  }

  openDialogConfirmDeleteAccount(user: User) {
    this.dialog.open(ConfirmDeleteAccountComponent, {
      width: "30%"
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.deleteAccount(user)
      }
    })
  }

  deleteAccount(user: User) {
    this.service.deleteUser(`http://localhost:3001/deleteUser/${user.id}`).subscribe({
      next: () => {
        this._snackBar.open(this.massageDeleteUserOk)._dismissAfter(2000)
          , setTimeout(() => (window.location.reload()), 2000);
      }, error: () => {
        this._snackBar.open(this.massageError)._dismissAfter(3000)
      }
    })
  }
}
