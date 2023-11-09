import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { EChartsOption } from 'echarts/types/dist/echarts';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { SensorName } from 'src/app/common/enums/sensor-name.enum';
HC_exporting(Highcharts);
//import * as echarts from 'echarts';

interface SensorReading {
  sensor_name: string;
  unit?: string;
  value?: number;
  lower_limit: number;
  upper_limit: number;
  tolerance?: number;
}

@Component({
  selector: 'app-zhenair-stats',
  templateUrl: './zhenair-stats.page.html',
  styleUrls: ['./zhenair-stats.page.scss'],
})
export class ZhenairStatsPage implements OnInit {
  constructor() {}

  //Archivo de configuracion local

  PM25_SensorConfig: SensorReading = {
    sensor_name: 'PM2.5',
    unit: 'µg/m³',
    lower_limit: 0,
    upper_limit: 200,
    tolerance:35
  };
  PM10_SensorConfig: SensorReading = {
    sensor_name: 'PM10',
    unit: 'µg/m³',
    lower_limit: 0,
    upper_limit: 400,
    tolerance:150
  };
  CO2_SensorConfig: SensorReading = {
    sensor_name: 'CO2',
    unit: 'ppm',
    lower_limit: 0,
    upper_limit: 5500,
    tolerance:2000
  };
  Temperature_SensorConfig: SensorReading = {
    sensor_name: 'Temperatura',
    unit: '°C',
    lower_limit: 0,
    upper_limit: 150,
  };
  Humidity_SensorConfig: SensorReading = {
    sensor_name: 'Humedad',
    unit: '%',
    lower_limit: 0,
    upper_limit: 100,
  };

  sensorConfigs: SensorReading[] = [
    {
      sensor_name: 'PM2.5',
      unit: 'µg/m³',
      lower_limit: 0,
      upper_limit: 200,
    },
    {
      sensor_name: 'PM10',
      unit: 'µg/m³',
      lower_limit: 0,
      upper_limit: 400,
    },
    {
      sensor_name: 'CO2',
      unit: 'ppm',
      lower_limit: 0,
      upper_limit: 5500,
    },
    {
      sensor_name: 'Temperatura',
      unit: '°C',
      lower_limit: 0,
      upper_limit: 150,
    },
    {
      sensor_name: 'Humedad',
      unit: '%',
      lower_limit: 0,
      upper_limit: 100,
    },
  ];

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

  standardSensorConfig: EChartsOption = {
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
  temperatureSensorConfig: EChartsOption = {
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

  x: EChartsOption [] = []

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
      // {
      //   type: 'gauge',
      //   center: ['50%', '60%'],
      //   startAngle: 200,
      //   endAngle: -20,
      //   min: 0,
      //   max: 60,
      //   itemStyle: {
      //     color: '#FD7347'
      //   },
      //   progress: {
      //     show: true,
      //     width: 8
      //   },
      //   pointer: {
      //     show: false
      //   },
      //   axisLine: {
      //     show: false
      //   },
      //   axisTick: {
      //     show: false
      //   },
      //   splitLine: {
      //     show: false
      //   },
      //   axisLabel: {
      //     show: false
      //   },
      //   detail: {
      //     show: false
      //   },
      //   data: [
      //     {
      //       value: 20
      //     }
      //   ]
      // }
    ],
  };

  ngOnInit(): void {
    this.mockdata.forEach((element, index) => {
      if (element.sensor_name == SensorName.TEMPERATURE) {
        //this.loadTemperatureConfig(element.value, element.sensor_name);
      }
      console.log(element.sensor_name);
      this.loadAirSensorConfig(element.value, element.sensor_name);
    });
  }

  loadTemperatureConfig(val: number, sensorName: string) {
    const {
      sensor_name,
      unit,
      lower_limit,
      upper_limit,
      value = val,
    } = this.Temperature_SensorConfig;

    let newTempReading: EChartsOption = {
      series: [
        {
          type: 'gauge',
          center: ['50%', '75%'],
          startAngle: 200,
          endAngle: -20,
          min: lower_limit,
          max: upper_limit,
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
            fontWeight: 'bolder',
            formatter: `${value} ${unit}`,
            color: 'inherit',
          },
          data: [
            {
              value: value,
            },
          ],
        },
      ],
    };
  }

  loadAirSensorConfig(val: number, sensorName: string) {
    let config: SensorReading;
    let value : number = 0;

    switch (sensorName) {
      case SensorName.PM25:
        config = this.PM25_SensorConfig;
        value = val;
        break;
      case SensorName.PM10:
        config = this.PM10_SensorConfig;
        value = val;
        break;
      case SensorName.CO2:
        config = this.CO2_SensorConfig;
        value = val;
        break;
      case SensorName.HUMIDITY:
        config = this.Humidity_SensorConfig;
        value = val;
        break;
      default:
        return;
        
        
    }
    console.log(config);
    this.buildChart(config, value);
  }


  buildChart(config: SensorReading, val: number) {

    const { sensor_name, unit, lower_limit, upper_limit, value=val, tolerance } = config;

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
                [tolerance ? tolerance : 0  / upper_limit, '#049DD9'],
  
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
