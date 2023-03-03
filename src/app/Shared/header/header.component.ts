import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/Pages/login/login.component';
import { ILog } from '../interfaces/login.interface';
import { AccountComponent } from 'src/app/Pages/account/account.component';

import decode from 'jwt-decode';
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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.session()
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
