import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesPage } from './devices-page';
import { DevicesPageRoutingModule } from './devices-page-routing.module';



@NgModule({
  declarations: [DevicesPage],
  imports: [
    CommonModule,
    DevicesPageRoutingModule
  ]
})
export class DevicesPageModule { }
