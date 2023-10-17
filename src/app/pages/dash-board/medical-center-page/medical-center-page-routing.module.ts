import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalCenterPage }  from './medical-center-page';

const routes: Routes = [
  {
    path: '',
    component: MedicalCenterPage
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalCenterPageRoutingModule { }
