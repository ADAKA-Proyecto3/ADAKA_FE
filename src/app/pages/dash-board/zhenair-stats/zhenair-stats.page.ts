import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subscription, from } from 'rxjs';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
@Component({
  selector: 'app-zhenair-stats',
  templateUrl: './zhenair-stats.page.html',
  styleUrls: ['./zhenair-stats.page.scss'],
})
export class ZhenairStatsPage implements OnInit, OnDestroy {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly store: Store<AppState>,
    private readonly pageRouter: PageRouterService
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
  private activeUserSuscription: Subscription = new Subscription();
  private roomsSuscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.submitForm = new FormGroup({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      room: new FormControl('', [Validators.required]),
    });

   this.activeUserSuscription = this.store
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
          dataZoom: {
            yAxisIndex: 'none',
          },
        },
      },
      dataZoom: [
        {
          startValue: '2014-06-01',
        },
        {
          type: 'inside',
        },
      ],
      xAxis: {
        type: 'category',
        data: [
          '10-22 00',
          '10-22 01',
          '10-22 02',
          '10-22 03',
          '10-22 04',
          '10-22 05',
          '10-22 06',
          '10-22 07',
          '10-22 08',
          '10-22 09',
          '10-22 10',
          '10-22 11',
          '10-22 12',
          '10-22 13',
          '10-22 14',
          '10-22 15',
          '10-22 16',
          '10-22 17',
          '10-22 18',
          '10-22 19',
          '10-22 20',
          '10-22 21',
          '10-22 22',
          '10-22 23',
          '10-23 00',
          '10-23 01',
          '10-23 02',
          '10-23 03',
          '10-23 04',
          '10-23 05',
          '10-23 06',
          '10-23 07',
          '10-23 08',
          '10-23 09',
          '10-23 10',
          '10-23 11',
          '10-23 12',
          '10-23 13',
          '10-23 14',
          '10-23 15',
          '10-23 16',
          '10-23 17',
          '10-23 18',
          '10-23 19',
          '10-23 20',
          '10-23 21',
          '10-23 22',
          '10-23 23',
          '10-24 00',
          '10-24 01',
          '10-24 02',
          '10-24 03',
          '10-24 04',
          '10-24 05',
          '10-24 06',
          '10-24 07',
          '10-24 08',
          '10-24 09',
          '10-24 10',
          '10-24 11',
          '10-24 12',
          '10-24 13',
          '10-24 14',
          '10-24 15',
          '10-24 16',
          '10-24 17',
          '10-24 18',
          '10-24 19',
          '10-24 20',
          '10-24 21',
          '10-24 22',
          '10-24 23',
          '10-25 00',
          '10-25 01',
          '10-25 02',
          '10-25 03',
          '10-25 04',
          '10-25 05',
          '10-25 06',
          '10-25 07',
          '10-25 08',
          '10-25 09',
          '10-25 10',
          '10-25 11',
          '10-25 12',
          '10-25 13',
          '10-25 14',
          '10-25 15',
          '10-25 16',
          '10-25 17',
          '10-25 18',
          '10-25 19',
          '10-25 20',
          '10-25 21',
          '10-25 22',
          '10-25 23',
          '10-26 00',
          '10-26 01',
          '10-26 02',
          '10-26 03',
          '10-26 04',
          '10-26 05',
          '10-26 06',
          '10-26 07',
          '10-26 08',
          '10-26 09',
          '10-26 10',
          '10-26 11',
          '10-26 12',
          '10-26 13',
          '10-26 14',
          '10-26 15',
          '10-26 16',
          '10-26 17',
          '10-26 18',
          '10-26 19',
          '10-26 20',
          '10-26 21',
          '10-26 22',
          '10-26 23',
          '10-27 00',
          '10-27 01',
          '10-27 02',
          '10-27 03',
          '10-27 04',
          '10-27 05',
          '10-27 06',
          '10-27 07',
          '10-27 08',
          '10-27 09',
          '10-27 10',
          '10-27 11',
          '10-27 12',
          '10-27 13',
          '10-27 14',
          '10-27 15',
          '10-27 16',
          '10-27 17',
          '10-27 18',
          '10-27 19',
          '10-27 20',
          '10-27 21',
          '10-27 22',
          '10-27 23',
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
          data: [28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45],
          triggerLineEvent: true,
        },
        {
          name: 'PM2.5',
          type: 'line',
          step: 'start',
          data: [28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45],
        },
        {
          name: 'PM10',
          type: 'line',
          step: 'start',
          data: [70, 45, 60, 200, 66, 54, 75, 120, 50, 98,100,50,70, 45, 60, 200, 66, 54, 75, 120, 50, 98,100,50,70, 45, 60, 200, 66, 54, 75, 120, 50, 98,100,50,70, 45, 60, 200, 66, 54, 75, 120, 50, 98,100,50,70, 45, 60, 200, 66, 54, 75, 120, 50, 98,100,50,70, 45, 60, 200, 66, 54, 75, 120, 50, 98,100,50,70, 45, 60, 200, 66, 54, 75, 120, 50, 98,100,50,70, 45, 60, 200, 66, 54, 75, 120, 50, 98,100,50,70, 45, 60, 200, 66, 54, 75, 120, 50, 98,100,50,70, 45, 60, 200, 66, 54, 75, 120, 50, 98,100,50],
        },
        {
          name: 'Temperatura',
          type: 'line',
          step: 'start',
          data: [28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45,28, 25, 30, 44, 50, 12, 18, 22, 45, 31,40,45],
        },
        {
          name: 'Humedad',
          type: 'line',
          step: 'start',
          data: [65, 3, 40, 14, 30, 2, 8, 2, 5, 31, 40, 25,65, 3, 40, 14, 30, 2, 8, 2, 5, 31, 40, 25,65, 3, 40, 14, 30, 2, 8, 2, 5, 31, 40, 25,65, 3, 40, 14, 30, 2, 8, 2, 5, 31, 40, 25,65, 3, 40, 14, 30, 2, 8, 2, 5, 31, 40, 25,65, 3, 40, 14, 30, 2, 8, 2, 5, 31, 40, 25,65, 3, 40, 14, 30, 2, 8, 2, 5, 31, 40, 25,65, 3, 40, 14, 30, 2, 8, 2, 5, 31, 40, 25,65, 3, 40, 14, 30, 2, 8, 2, 5, 31, 40, 25,65, 3, 40, 14, 30, 2, 8, 2, 5, 31, 40, 25],
        },
        {
          name: 'VOC',
          type: 'line',
          step: 'start',
          data: [1, 0, 1, 0, 0, 0, 1, 0, 0, 1,0,0,1, 0, 1, 0, 0, 0, 1, 0, 0, 1,0,0,1, 0, 1, 0, 0, 0, 1, 0, 0, 1,0,0,1, 0, 1, 0, 0, 0, 1, 0, 0, 1,0,0,1, 0, 1, 0, 0, 0, 1, 0, 0, 1,0,0,1, 0, 1, 0, 0, 0, 1, 0, 0, 1,0,0,1, 0, 1, 0, 0, 0, 1, 0, 0, 1,0,0,1, 0, 1, 0, 0, 0, 1, 0, 0, 1,0,0,1, 0, 1, 0, 0, 0, 1, 0, 0, 1,0,0,1, 0, 1, 0, 0, 0, 1, 0, 0, 1,0,0],
        },
      ],
    };
  }

  ngOnDestroy(): void {
    this.activeUserSuscription.unsubscribe();
    this.roomsSuscription.unsubscribe();
  }

  loadRoomOptions(): void {
    this.roomsSuscription = this.store.select('rooms').subscribe(({ rooms }) => {
      this.rooms = rooms;
      this.roomOptions = this.rooms.map((room) => {
        return { value: room.id!, viewValue: room.name };
      });
    });
  }

  onSubmit() {
    console.log(this.submitForm.value);
    this.testBool = true;
  }

  goToMain() {
    this.pageRouter.route(`${UrlPages.DASHBOARD}/${UrlPages.MAIN}`);
  }
}
