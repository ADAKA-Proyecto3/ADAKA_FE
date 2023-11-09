import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansPage } from './plans.page';


const routes:Routes = [
  {
    path:'',
    component: PlansPage
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],  
})
export class PlansPageRoutingModule { }
