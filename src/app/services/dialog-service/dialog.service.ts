import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public toastDialog: MatDialogRef<DialogComponent> | null | undefined;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    ) { }

  async showToast(message: string, action:string = "OK") {

    this._snackBar.open(message, action, {
      duration: 2700,
      verticalPosition: 'top',
    });


    // if (this.toastDialog?.getState() === MatDialogState.OPEN) {
    //   this.dismiss();
    // }

    // this.toastDialog = this.dialog.open(DialogComponent, {
    //   width: '100%',
    //   data: message,
    //   panelClass: 'base-modal',
    //   position: { top: '1%' },
    // });

    //if (useTimeOut) {
      // setTimeout(() => {
      //   this.dismiss();
      // }
      //   , 3000);
   // }
    
  }



  dismiss() {
    if (this.toastDialog) {
      if (this.toastDialog?.getState() === MatDialogState.OPEN) {
        this.toastDialog.close();
      }
    }
  }
}
