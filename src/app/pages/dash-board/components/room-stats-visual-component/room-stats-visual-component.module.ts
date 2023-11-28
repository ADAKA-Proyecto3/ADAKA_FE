import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomStatsVisualComponent } from './room-stats-visual-component';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import {  MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [RoomStatsVisualComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatTabsModule,
  ],

  exports: [RoomStatsVisualComponent]
})
export class RoomStatsVisualComponentModule { }
