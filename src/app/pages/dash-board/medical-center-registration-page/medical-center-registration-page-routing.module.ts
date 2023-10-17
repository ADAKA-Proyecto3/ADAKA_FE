import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalCenterRegistrationPage } from './medical-center-registration-page';

const routes: Routes = [
  {
    path: '',
    component:MedicalCenterRegistrationPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalCenterRegistrationPageRoutingModule { }


