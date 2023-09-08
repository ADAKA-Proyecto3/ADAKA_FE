import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPage } from './landing.page';
import { LandingRoutingModule } from './landing-routing.module';



@NgModule({
  declarations: [ LandingPage  ],
  imports: [
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
