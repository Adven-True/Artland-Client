import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  @Output() confirmOrder: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  submitForm() {
    this.dialogRef.close({
      code: '000',
      msg: this.data
    }); // close the dialog box and pass true as the result
  }

  cancel() {
    this.dialogRef.close({
      code: '400',
      msg: 'close'
    }); // close the dialog box and pass false as the result
  }
}