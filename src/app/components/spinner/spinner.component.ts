import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public  message: string,
    private dialogRef: MatDialogRef<SpinnerComponent> 
  ) { 
    dialogRef.disableClose = true;
  }

}
