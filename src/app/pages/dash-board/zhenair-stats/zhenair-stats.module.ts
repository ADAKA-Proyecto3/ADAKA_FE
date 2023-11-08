import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZhenairStatsPage } from './zhenair-stats.page';
import { ZhenAirStatsRoutingModule } from './zhenair-stats-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';

// Highcharts modules must be provided in a factory (required for aot)
import { ChartModule, HIGHCHARTS_MODULES } from "angular-highcharts";
import * as more from "highcharts/highcharts-more.src";
import * as solidGauge from "highcharts/modules/solid-gauge.src";
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [ZhenairStatsPage],
  imports: [
    CommonModule,
    ZhenAirStatsRoutingModule,
    ChartModule,
    NgxChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })

  ],
  // providers: [
  //   { provide: HIGHCHARTS_MODULES, useFactory: () => [more, solidGauge] },
  // ]
})
export class ZhenairStatsModule { }
