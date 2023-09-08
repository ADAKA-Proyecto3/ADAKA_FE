import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './landing.page';

const routes:Routes = [
  {
    path:'',
    component: LandingPage
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],  
})
export class LandingRoutingModule { }
