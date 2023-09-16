import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPage } from './landing.page';
import { LandingRoutingModule } from './landing-routing.module';
import { CardModule } from 'src/app/components/card/card.module';




@NgModule({
  declarations: [ LandingPage  ],
  imports: [ CommonModule, LandingRoutingModule, CardModule ]
})
export class LandingModule { }
