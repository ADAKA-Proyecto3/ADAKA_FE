import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalCentersPage } from './medicalCenters-page';



const routes: Routes = [
  {
    path: '',
    component: MedicalCentersPage
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalCentersPageRoutingModule { }
