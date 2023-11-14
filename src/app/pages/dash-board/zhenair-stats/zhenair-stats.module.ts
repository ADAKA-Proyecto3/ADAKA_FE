import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZhenairStatsPage } from './zhenair-stats.page';
import { ZhenAirStatsRoutingModule } from './zhenair-stats-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [ZhenairStatsPage],
  imports: [
    CommonModule,
    ZhenAirStatsRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    
    

  ],
 
})
export class ZhenairStatsModule { }
