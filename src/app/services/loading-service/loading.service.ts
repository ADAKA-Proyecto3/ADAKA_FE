import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { LoadingMessages } from "src/app/common/enums/loading-messages.enum";
import { SpinnerComponent } from "src/app/components/spinner/spinner.component";


@Injectable({ providedIn: 'root',  })
export class LoadingService {

public loadingDialog: MatDialogRef<SpinnerComponent> | null | undefined;

constructor(public dialog : MatDialog) {}


async showLoadingModal( messageKey: LoadingMessages = LoadingMessages.LOADING ) {

    if (this.loadingDialog?.getState() === MatDialogState.OPEN) {
        this.dismiss();
    }


    this.loadingDialog = this.dialog.open(SpinnerComponent, {
      data: messageKey,
      panelClass: 'base-modal',
    });
}


dismiss() {
    if (this.loadingDialog) {
    
      if (this.loadingDialog?.getState() === MatDialogState.OPEN) {
        this.loadingDialog.close();
      }
    }
  }


}