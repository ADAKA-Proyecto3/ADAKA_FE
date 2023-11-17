import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EChartsOption } from 'echarts';
import {
  CO2_SensorConfig,
  Humidity_SensorConfig,
  PM10_SensorConfig,
  PM25_SensorConfig,
  Temperature_SensorConfig,
} from 'src/app/common/chart-config/chart-config';
import { SensorName } from 'src/app/common/enums/sensor-name.enum';
import { SensorReading } from 'src/app/common/interfaces/sensor-reading';
import { MetricsService } from 'src/app/services/http-service/metrics-http.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { AppState } from 'src/app/store/app.state';
import { SensorData } from '../../../../models/sensor-data.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room-stats-visual-component',
  templateUrl: './room-stats-visual-component.html',
  styleUrls: ['./room-stats-visual-component.scss'],
})
export class RoomStatsVisualComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any | undefined,
    private matDialogRef: MatDialogRef<RoomStatsVisualComponent>,
    private readonly store: Store<AppState>,
    private readonly loadingService: LoadingService,
    private metricsService: MetricsService
  ) {
    matDialogRef.disableClose = false;
  }

  sensorData: SensorData[] = [];
  x: EChartsOption[] = [];
  y: EChartsOption = {};
  private SensorDataSuscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.SensorDataSuscription = this.metricsService
      .getLatesMetricForRoom(this.data.id)
      .subscribe((data) => {
        this.sensorData = data[0].sensorData;
        this.processSensorData();
      });
  }
  ngOnDestroy(): void {
    this.SensorDataSuscription.unsubscribe();
  }

  processSensorData() {
    this.sensorData.forEach((element, index) => {
      if (element.sensorName == SensorName.TEMPERATURE) {
        this.loadTemperatureConfig(element.value, element.sensorName);
      }

      this.loadAirSensorConfig(element.value, element.sensorName);
    });
  }

  loadTemperatureConfig(val: number, sensorName: string) {
    const {
      sensor_name = sensorName,
      unit,
      lower_limit,
      upper_limit,
      value = val,
    } = Temperature_SensorConfig;

    const newTempReading: EChartsOption = {
      series: [
        {
          type: 'gauge',
          center: ['50%', '75%'],
          radius: '80%',
          startAngle: 200,
          endAngle: -20,
          min: lower_limit,
          max: upper_limit,
          splitNumber: 3,
          itemStyle: {
            color: '#042959',
          },
          progress: {
            show: true,
            width: 20,
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            show: true,
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: '#042959',
            },
          },
          axisLine: {
            lineStyle: {
              width: 5,
            },
          },
          splitLine: {
            distance: -10,
            length: 0,
            lineStyle: {
              width: 3,
              color: '#999',
            },
          },
          axisLabel: {
            distance: -10,
            color: '#999',
          },
          anchor: {
            show: false,
          },
          title: {
            show: true,
            offsetCenter: [0, '-10%'],
            fontSize: 20,
          },
          detail: {
            fontSize: 30,
            //valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            offsetCenter: [0, '-15%'],
            formatter: function (value) {
              return `{value|${value.toFixed(0)}}{unit|${unit}}`;
            },
            color: 'inherit',
            rich: {
              value: {
                fontSize: 25,
                fontWeight: 'bolder',
                color: '#777',
              },
              unit: {
                // fontSize: 18,
                color: '#999',
                //padding: [0, 0, -20, 10],
              },
            },
          },
          data: [
            {
              value: value,
              name: sensor_name,
              title: {
                offsetCenter: [0, '20%'],
                fontSize: 20,
              },
            },
          ],
        },
      ],
    };

    this.y = newTempReading;
  }

  loadAirSensorConfig(val: number, sensorName: string) {
    let config: SensorReading;
    let value: number = 0;

    switch (sensorName) {
      case SensorName.PM25:
        config = PM25_SensorConfig;
        value = val;
        break;
      case SensorName.PM10:
        config = PM10_SensorConfig;
        value = val;
        break;
      case SensorName.CO2:
        config = CO2_SensorConfig;
        value = val;
        break;
      case SensorName.HUMIDITY:
        config = Humidity_SensorConfig;
        value = val;
        break;
      default:
        return;
    }

    this.buildChart(config, value);
  }

  buildChart(config: SensorReading, val: number) {
    const {
      sensor_name,
      unit,
      lower_limit,
      upper_limit,
      value = val,
      tolerance,
    } = config;

    let newReading: EChartsOption = {
      grid: {
        top: 0, // Adjust the top padding as needed
        bottom: 0, // Adjust the bottom padding as needed
        left: 0, // Adjust the left padding as needed
        right: 0, // Adjust the right padding as needed
      },

      series: [
        {
          type: 'gauge',
          center: ['50%', '75%'],
          radius: '80%',
          startAngle: 200,
          endAngle: -20,

          min: lower_limit,
          max: upper_limit,
          splitNumber: 4,
          itemStyle: {
            color: '#FFAB91',
          },
          axisLine: {
            lineStyle: {
              width: 20,
              color: [
                [
                  tolerance ? tolerance / upper_limit : 0 / upper_limit,
                  '#049DD9',
                ],

                [upper_limit - lower_limit, '#FF6E76'],
              ],
            },
          },

          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto',
            },
          },
          axisTick: {
            length: 1,
            lineStyle: {
              color: 'auto',
              width: 2,
            },
            show: false,
          },
          splitLine: {
            length: 5,
            lineStyle: {
              color: 'auto',
              width: 5,
            },
          },
          axisLabel: {
            distance: -40,
            color: '#999',
            //fontSize: 20,
          },
          title: {
            offsetCenter: [0, '-10%'],
            fontSize: 20,
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, '-15%'],
            valueAnimation: true,
            formatter: function (value) {
              return `{value|${value.toFixed(0)}}{unit|${unit}}`;
            },
            color: 'inherit',
            rich: {
              value: {
                fontSize: 25,
                fontWeight: 'bolder',
                color: '#777',
              },
              unit: {
                // fontSize: 18,
                color: '#999',
                //padding: [0, 0, -20, 10],
              },
            },
          },

          data: [
            {
              value: value,
              name: sensor_name,
              title: {
                offsetCenter: [0, '20%'],
                fontSize: 20,
              },
            },
          ],
        },
      ],
    };

    this.x.push(newReading);
  }

  closeDialog() {
    this.matDialogRef.close();
  }
}
