import { NgModule } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerComponent } from './spinner.component';



@NgModule({
  declarations: [SpinnerComponent],
  imports: [MatProgressSpinnerModule, MatDialogModule]
})
export class SpinnerModule { }
