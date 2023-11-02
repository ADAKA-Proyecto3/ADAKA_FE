import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserFormModule } from '../components/user-form-component/user-form.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RoomFormModule } from '../components/room-form-component/room-form.module';
import { MainPage } from './main.page';
import { MainPageRoutingModule } from './main-page-routing.module';




@NgModule({
  declarations: [MainPage],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RoomFormModule,
    MatTooltipModule

  ],
 
})
export class MainPageModule { }
