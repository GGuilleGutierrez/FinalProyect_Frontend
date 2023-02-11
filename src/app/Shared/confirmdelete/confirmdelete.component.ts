import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../Services/service.service';
import { ProductdetailComponent } from 'src/app/Pages/productdetail/productdetail.component';


@Component({
  selector: 'app-confirmdelete',
  templateUrl: './confirmdelete.component.html',
  styleUrls: ['./confirmdelete.component.css']
})
export class ConfirmdeleteComponent {
  constructor(public dialogRef: MatDialogRef<ProductdetailComponent>, private service: ServiceService) { }

  close(confirm: boolean) {
    this.dialogRef.close(confirm)
  }
}