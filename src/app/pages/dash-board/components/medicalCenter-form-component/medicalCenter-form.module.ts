import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalCenterFormComponent } from './medicalCenter-form-component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';







@NgModule({
  declarations: [MedicalCenterFormComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,

  ],
  exports: [MedicalCenterFormComponent]
})
export class MedicalCenterFormModule { }
