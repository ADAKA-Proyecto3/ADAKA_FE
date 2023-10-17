import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalCenterPage } from './medical-center-page';
import { MedicalCenterPageRoutingModule } from './medical-center-page-routing.module';
import { MedicalCenterRegistrationPageModule } from '../medical-center-registration-page/medical-center-registration-page.module';


@NgModule({
  declarations: [
    MedicalCenterPage
  ],
  imports: [
    CommonModule,
    MedicalCenterPageRoutingModule,
    MedicalCenterRegistrationPageModule
  ]
})
export class MedicalCenterPageModule { }
