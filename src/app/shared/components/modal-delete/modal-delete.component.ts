import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css'],
})
export class ModalDeleteComponent {
  constructor(public dialogRef: MatDialogRef<ModalDeleteComponent>,) {}

  cancel() {
    this.dialogRef.close();
  }

  ok(){
    this.dialogRef.close(true);
  }
}
