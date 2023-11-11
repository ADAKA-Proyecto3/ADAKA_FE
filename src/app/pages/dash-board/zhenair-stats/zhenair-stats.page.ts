import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EChartsOption } from 'echarts/types/dist/echarts';
import {
  CO2_SensorConfig,
  Humidity_SensorConfig,
  PM10_SensorConfig,
  PM25_SensorConfig,
  Temperature_SensorConfig,
} from 'src/app/common/chart-config/chart-config';
import { SensorName } from 'src/app/common/enums/sensor-name.enum';
import { SelectOption } from 'src/app/common/interfaces/option.interface';
import { SensorReading } from 'src/app/common/interfaces/sensor-reading';
import { Room } from 'src/app/models/rooms.interface';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { loadRooms } from 'src/app/store/actions/room.actions';
import { AppState } from 'src/app/store/app.state';
import { from } from 'rxjs';
@Component({
  selector: 'app-zhenair-stats',
  templateUrl: './zhenair-stats.page.html',
  styleUrls: ['./zhenair-stats.page.scss'],
})
export class ZhenairStatsPage implements OnInit {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly store: Store<AppState>
  ) {}

  public submitForm: FormGroup = {} as FormGroup;
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
  rooms: Room[] = [];
  roomOptions: SelectOption[] = [];
  activeUser: any;
  x: EChartsOption[] = [];
  y: EChartsOption = {};

  testBool: boolean = false;

  ngOnInit(): void {

    this.submitForm = new FormGroup({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      room: new FormControl('', [Validators.required]),
    });

    this.store
      .select((state) => state.user.activeUser.id)
      .subscribe((id) => {
        this.activeUser = id;
        this.store.dispatch(loadRooms({ id: this.activeUser }));
      });

    this.loadRoomOptions();

    this.y = {
      title: {
        text: '',
      },

      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['CO2', 'PM2.5', 'PM10', 'Temperatura', 'Humedad', 'VOC'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true,
        z: 0,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        data: [
          '10-22',
          '10-24',
          '10-26',
          '10-28',
          '10-30',
          '11-01',
          '11-03',
          '11-05',
          '11-07',
          '11-09',
        ],
      },

      yAxis: {
        type: 'value',
        axisTick: {
          length: 2,
        },
        minorTick: {
          show: true,
          splitNumber: 5,
        },
        maxInterval: 20,
      },
      series: [
        {
          name: 'CO2',
          type: 'line',
          step: 'start',
          data: [65, 3, 40, 14, 30, 2, 8, 2, 5, 31],
          triggerLineEvent: true,
        },
        {
          name: 'PM2.5',
          type: 'line',
          step: 'start',
          data: [17, 20, 37, 40, 15, 10, 100, 17, 50, 55],
        },
        {
          name: 'PM10',
          type: 'line',
          step: 'start',
          data: [70, 45, 60, 200, 66, 54, 75, 120, 50, 98],
        },
        {
          name: 'Temperatura',
          type: 'line',
          step: 'start',
          data: [28, 25, 30, 44, 50, 12, 18, 22, 45, 31],
        },
        {
          name: 'Humedad',
          type: 'line',
          step: 'start',
          data: [65, 3, 40, 14, 30, 2, 8, 2, 5, 31],
        },
        {
          name: 'VOC',
          type: 'line',
          step: 'start',
          data: [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
        },
      ],
    };
  }

  loadRoomOptions(): void {
    this.store.select('rooms').subscribe(({ rooms }) => {
      this.rooms = rooms;
      this.roomOptions = this.rooms.map((room) => {
        return { value: room.id!, viewValue: room.name };
      });
    });
  }


  onSubmit(){
    console.log(this.submitForm.value);
    this.testBool = true;

  }
}
