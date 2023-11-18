import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {MatTooltipModule} from '@angular/material/tooltip';
import { RoomFormModule } from '../components/room-form-component/room-form.module';
import { MainPage } from './main.page';
import { MainPageRoutingModule } from './main-page-routing.module';

import {MatCardModule} from '@angular/material/card';




@NgModule({
  declarations: [MainPage],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MatButtonModule,
    MatIconModule,
    RoomFormModule,
    MatTooltipModule,
    MatCardModule


  ],
 
})
export class MainPageModule { }
