import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EChartsOption } from 'echarts/types/dist/echarts';
import { SelectOption } from 'src/app/common/interfaces/option.interface';
import { Room } from 'src/app/models/rooms.interface';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { loadRooms } from 'src/app/store/actions/room.actions';
import { AppState } from 'src/app/store/app.state';
import { Subscription } from 'rxjs';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';

import format from 'date-fns/format';
import { ZhenAirPageController } from './zhenair-stats-page.controller';

@Component({
  selector: 'app-zhenair-stats',
  templateUrl: './zhenair-stats.page.html',
  styleUrls: ['./zhenair-stats.page.scss'],
})
export class ZhenairStatsPage implements OnInit, OnDestroy {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly store: Store<AppState>,
    private readonly pageRouter: PageRouterService,
    private readonly zhenairController: ZhenAirPageController
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
        this.loadRoomOptions();
      });
  }

  ngOnDestroy(): void {
    console.log('destroyed');
    this.activeUserSuscription.unsubscribe();
    this.roomsSuscription.unsubscribe();
  }

  loadRoomOptions(): void {
    this.roomsSuscription = this.store
      .select('rooms')
      .subscribe(({ rooms }) => {
        this.rooms = rooms;
        this.roomOptions = this.rooms.map((room) => {
          return { value: room.id!, viewValue: room.name };
        });
      });
  }

  async onSubmit() {
    if (this.submitForm.invalid) return;
    const fromDate: string = format(
      new Date(this.submitForm.value.fromDate),
      'yyyy-MM-dd'
    );
    const toDate: string = format(
      new Date(this.submitForm.value.toDate),
      'yyyy-MM-dd'
    );
    const resultData = await this.zhenairController.requestHistoricalData(
      this.submitForm.value.room,
      fromDate,
      toDate
    );
    console.log(resultData);
    this.processData(resultData);
  }

  processData(data: any): void {
    const indexesToKeep: number[] = [];
    const addedHours: Set<string> = new Set();

    console.log(data.dates);

    data.dates.forEach((timestamp: string, index: number) => {
      const [datePart, timePart] = timestamp.split(' ');
      const [month, day] = datePart.split('-');
      const hour = timePart.split(':')[0];
      const formattedHour = `${month}-${day} ${hour.padStart(2, '0')}`; //

      if (!addedHours.has(formattedHour)) {
        indexesToKeep.push(index);
        addedHours.add(formattedHour);
      }
    });

    const addedHoursArray: string[] = Array.from(addedHours);

    const humedad: number[] = indexesToKeep.map((index) => data.Humedad[index]);
    const voc: number[] = indexesToKeep.map((index) => data.VOC[index] / 100);
    const co2: number[] = indexesToKeep.map((index) => data.CO2[index] / 10);
    const pm25: number[] = indexesToKeep.map((index) => data['PM2.5'][index]);
    const pm10: number[] = indexesToKeep.map((index) => data.PM10[index]);
    const temperatura: number[] = indexesToKeep.map(
      (index) => data.Temperatura[index]
    );

    console.log(Array.from(addedHoursArray));

    this.loadGraph(addedHoursArray, humedad, voc, co2, pm25, pm10, temperatura);
  }

  loadGraph(
    addedHours: string[],
    humedad: number[],
    voc: number[],
    co2: number[],
    pm25: number[],
    pm10: number[],
    temperatura: number[]
  ): void {
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
        data: addedHours,
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
          data: co2,
          triggerLineEvent: true,
        },
        {
          name: 'PM2.5',
          type: 'line',
          step: 'start',
          data: pm25,
        },
        {
          name: 'PM10',
          type: 'line',
          step: 'start',
          data: pm10,
        },
        {
          name: 'Temperatura',
          type: 'line',
          step: 'start',
          data: temperatura,
        },
        {
          name: 'Humedad',
          type: 'line',
          step: 'start',
          data: humedad,
        },
        {
          name: 'VOC',
          type: 'line',
          step: 'start',
          data: voc,
        },
      ],
    };

    this.testBool = true;
  }

  goToMain() {
    this.pageRouter.route(`${UrlPages.DASHBOARD}/${UrlPages.MAIN}`);
  }
}
