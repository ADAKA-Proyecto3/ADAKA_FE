import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZhenairStatsPage } from './zhenair-stats.page';
import { ZhenAirStatsRoutingModule } from './zhenair-stats-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';




@NgModule({
  declarations: [ZhenairStatsPage],
  imports: [
    CommonModule,
    ZhenAirStatsRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
    

  ],
 
})
export class ZhenairStatsModule { }
