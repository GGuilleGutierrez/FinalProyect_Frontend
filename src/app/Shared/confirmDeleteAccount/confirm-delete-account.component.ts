import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountComponent } from 'src/app/Pages/account/account.component';
import { ServiceService } from '../Services/service.service';

@Component({
  selector: 'app-confirm-delete-account',
  templateUrl: './confirm-delete-account.component.html',
  styleUrls: ['./confirm-delete-account.component.css']
})
export class ConfirmDeleteAccountComponent {
  constructor(public dialogRef: MatDialogRef<AccountComponent>, private service: ServiceService) { }

  close(confirm: boolean) {
    this.dialogRef.close(confirm)
  }
}