import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from 'src/app/common/locale/mat-paginator/spanish-paginator-intl';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RoomsPage } from './rooms-page';
import { RoomsPageRoutingModule } from './rooms-page-routing.module';
import { RoomFormModule } from '../components/room-form-component/room-form.module';
import { MatSelectModule } from '@angular/material/select';


import { ReactiveFormsModule } from '@angular/forms';
import { RoomStatsVisualComponentModule } from '../components/room-stats-visual-component/room-stats-visual-component.module';
import { AssignRoomDeviceModule } from '../components/assign-room-device-component/assign-room-device.module';




@NgModule({
  declarations: [RoomsPage],
  imports: [
    CommonModule,
    RoomsPageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RoomFormModule,
    MatTooltipModule,
    MatSelectModule,
    ReactiveFormsModule,
    RoomStatsVisualComponentModule,
    AssignRoomDeviceModule
    

  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }],
})
export class RoomsPageModule { }
