import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public toastDialog: MatDialogRef<DialogComponent> | null | undefined;

  constructor(private dialog: MatDialog) { }

  async showToast(message: string) {
    if (this.toastDialog?.getState() === MatDialogState.OPEN) {
      this.dismiss();
    }

    this.toastDialog = this.dialog.open(DialogComponent, {
      width: '100%',
      data: message,
      panelClass: 'base-modal',
      position: { top: '1%' },
    });

    setTimeout(() => {
      this.dismiss();
    }
      , 3000);
  }



  dismiss() {
    if (this.toastDialog) {
      if (this.toastDialog?.getState() === MatDialogState.OPEN) {
        this.toastDialog.close();
      }
    }
  }
}
