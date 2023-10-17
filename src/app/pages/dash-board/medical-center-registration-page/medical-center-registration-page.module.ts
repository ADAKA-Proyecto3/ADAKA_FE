import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalCenterRegistrationPage } from './medical-center-registration-page';
import { MedicalCenterRegistrationPageRoutingModule } from './medical-center-registration-page-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MedicalCenterRegistrationPage],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MedicalCenterRegistrationPageRoutingModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    MedicalCenterRegistrationPage
  ]
})
export class MedicalCenterRegistrationPageModule {}
