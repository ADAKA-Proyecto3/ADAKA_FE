import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EChartsOption } from 'echarts';
import { CO2_SensorConfig, Humidity_SensorConfig, PM10_SensorConfig, PM25_SensorConfig, Temperature_SensorConfig } from 'src/app/common/chart-config/chart-config';
import { SensorName } from 'src/app/common/enums/sensor-name.enum';
import { SensorReading } from 'src/app/common/interfaces/sensor-reading';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-room-stats-visual-component',
  templateUrl: './room-stats-visual-component.component.html',
  styleUrls: ['./room-stats-visual-component.component.scss']
})
export class RoomStatsVisualComponentComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any | undefined,
    private matDialogRef: MatDialogRef<RoomStatsVisualComponentComponent>,
    private readonly store: Store<AppState>,
    private readonly loadingService: LoadingService
  ) {
    matDialogRef.disableClose = true;
  }

   //Data que viene del API
  mockdata = [
    {
      value: 2819,
      unit: '',
      sensor_name: 'VOC',
    },
    {
      value: 29,
      unit: 'µg/m³',
      sensor_name: 'PM2.5',
    },
    {
      value: 31,
      unit: 'µg/m³',
      sensor_name: 'PM10',
    },
    {
      value: 448,
      unit: 'ppm',
      sensor_name: 'CO2',
    },
    {
      value: 31.6212,
      unit: '°C',
      sensor_name: 'Temperatura',
    },
    {
      value: 56.0272,
      unit: '%',
      sensor_name: 'Humedad',
    },
  ];

  x: EChartsOption[] = [];
  y: EChartsOption = {};

  option: EChartsOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 200,
        endAngle: -20,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 200,
        splitNumber: 4,
        itemStyle: {
          color: '#FFAB91',
        },
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [35 / 200, '#049DD9'],

              [1, '#FF6E76'],
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
          distance: -45,
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
            return '{value|' + value.toFixed(0) + '}{unit|µg/m³}';
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
              padding: [0, 0, -20, 10],
            },
          },
        },

        data: [
          {
            value: 35,
            name: 'PM2.5',
            title: {
              offsetCenter: [0, '20%'],
              fontSize: 20,
            },
          },
        ],
      },
    ],
  };

  temperature: EChartsOption = {
    series: [
      {
        type: 'gauge',
        center: ['50%', '75%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        splitNumber: 12,
        itemStyle: {
          color: '#042959',
        },
        progress: {
          show: true,
          width: 30,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 30,
          },
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: '#999',
          },
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: '#999',
          },
        },
        axisLabel: {
          distance: -20,
          color: '#999',
          fontSize: 20,
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, '-15%'],
          //fontSize: 60,
          fontWeight: 'bolder',
          formatter: '{value} °C',
          color: 'inherit',
        },
        data: [
          {
            value: 20,
          },
        ],
      },
     
    ],
  };

  ngOnInit(): void {
    this.loadingService.showLoadingModal();
    this.mockdata.forEach((element, index) => {
      if (element.sensor_name == SensorName.TEMPERATURE) {
        this.loadTemperatureConfig(element.value, element.sensor_name);
      }

      this.loadAirSensorConfig(element.value, element.sensor_name);
    });
    this.loadingService.dismiss();
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
          startAngle: 200,
          endAngle: -20,
          min: lower_limit,
          max: upper_limit,
          splitNumber: 5,
          itemStyle: {
            color: '#042959',
          },
          progress: {
            show: true,
            width: 30,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 30,
            },
          },
          splitLine: {
            distance: -40,
            length: 10,
            lineStyle: {
              width: 3,
              color: '#999',
            },
          },
          axisLabel: {
            distance: -20,
            color: '#999',
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            offsetCenter: [0, '-15%'],
            formatter: `${value.toFixed(1)} ${unit}`,
          },
          data: [
            {
              value: value,
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
      series: [
        {
          type: 'gauge',
          startAngle: 200,
          endAngle: -20,
          center: ['50%', '75%'],
          radius: '90%',
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
            distance: -45,
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
                padding: [0, 0, -20, 10],
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

}
