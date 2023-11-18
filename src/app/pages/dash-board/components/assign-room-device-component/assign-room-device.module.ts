import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AssignRoomDeviceFormComponent } from './assign-room-device-component';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [AssignRoomDeviceFormComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,

  ],
  exports: [AssignRoomDeviceFormComponent]
})
export class AssignRoomDeviceModule { }
