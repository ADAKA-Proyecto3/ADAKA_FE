import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import * as L from 'leaflet';
import { Map, circle, marker, tileLayer } from 'leaflet';
import { filter, take } from 'rxjs';
import { MapInfo } from 'src/app/models/map-info.interface';
import { MapInfoHttpService } from 'src/app/services/http-service/mapInfo-http.service';
import { AppState } from 'src/app/store/app.state';

export interface InfoData {
  range: string;
  level: string;
  healthImplications: string;
  cautionaryStatement: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private MapInfoList: MapInfo[] = [];

  map: L.Map | null = null;
  private view = {
    center: L.latLng(9.9202, -84.1031),
    zoom: 9,
  };

  constructor(
    private store: Store<AppState>,
    private mapInfoService: MapInfoHttpService
  ) {}

  displayedColumns: string[] = ['name', 'direction', 'status', 'actions'];
  dataSource = new MatTableDataSource<MapInfo>();
  dataSourceInfo = new MatTableDataSource<InfoData>();
  displayedColumnsInfo: string[] = [
    'range',
    'level',
    'healthImplications',
    'cautionaryStatement',
  ];

  ngOnInit(): void {
    this.initializeInfoData();
    this.createMap();
    this.getMapInfoaqicn();
    this.loadInfoMedicalCenters();
  }

  private initializeInfoData(): void {
    console.log();
    this.dataSourceInfo = new MatTableDataSource<InfoData>([
      {
        range: '0 - 50',
        level: 'Bueno',
        healthImplications:
          'La calidad del aire se considera satisfactoria y la contaminación atmosférica presenta poco o ningún riesgo.',
        cautionaryStatement: 'Ninguna',
      },
      {
        range: '51 - 100',
        level: 'Moderado',
        healthImplications:
          'La calidad del aire es aceptable; sin embargo, para algunos contaminantes puede haber una preocupación moderada por la salud para un número muy pequeño de personas que son inusualmente sensibles a la contaminación atmosférica.',
        cautionaryStatement:
          'Los niños y adultos activos, y las personas con enfermedades respiratorias como el asma, deben limitar la actividad al aire libre prolongada.',
      },
      {
        range: '101-150',
        level: 'No saludable para grupos sensibles',
        healthImplications:
          'Los miembros de grupos sensibles pueden experimentar efectos en la salud. Es poco probable que el público en general se vea afectado.',
        cautionaryStatement:
          'Los niños y adultos activos, y las personas con enfermedades respiratorias como el asma, deben limitar la actividad al aire libre prolongada.',
      },
      {
        range: '151-200',
        level: 'No saludable',
        healthImplications:
          'Todos pueden comenzar a experimentar efectos en la salud; los miembros de grupos sensibles pueden experimentar efectos más graves en la salud.',
        cautionaryStatement:
          'Los niños y adultos activos, y las personas con enfermedades respiratorias como el asma, deben evitar la actividad al aire libre prolongada; todos los demás, especialmente los niños, deben limitar la actividad al aire libre prolongada.',
      },
      {
        range: '201-300',
        level: 'Muy no saludable',
        healthImplications:
          'Advertencias de salud por condiciones de emergencia. Es más probable que toda la población se vea afectada.',
        cautionaryStatement:
          'Los niños y adultos activos, y las personas con enfermedades respiratorias como el asma, deben evitar toda actividad al aire libre; todos los demás, especialmente los niños, deben limitar la actividad al aire libre.',
      },
      {
        range: '300+',
        level: 'Peligroso',
        healthImplications:
          'Alerta de salud: todos pueden experimentar efectos más graves en la salud',
        cautionaryStatement: 'Todos deben evitar toda actividad al aire libre.',
      },
    ]);
  }

  private loadInfoMedicalCenters() {
    this.mapInfoService.getMapInfo().subscribe(
      (resp) => {
        const mapInfoList: MapInfo[] = resp.map((item) => {
          const valor: number = parseFloat(item.value);
          const status = this.calculateStatus(valor);
          
          return {
            name: item.name,
            direction: item.direction,
            latitude: item.latitude.toString(),
            longitude: item.longitude.toString(),
            status: status,
            value: item.value,
          };
        });

        this.updateMapInfoList(mapInfoList);
        this.addZone(this.MapInfoList);
      },
      (error) => {
        console.error('Error al obtener datos de getMapInfoaqicn:', error);
      }
    );
  }

  private createMap() {
    this.map = L.map('map').setView(this.view.center, this.view.zoom);

    const tileLayerOptions = {
      minZoom: 0,
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      ext: 'png',
    };

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.{ext}',
      tileLayerOptions
    ).addTo(this.map);

    this.addZone(this.MapInfoList);
  }

  cambiarVista(mapInfo: MapInfo) {
    if (this.map) {
      this.map.setView(
        [Number(mapInfo.latitude), Number(mapInfo.longitude)],
        17
      );
    }
  }

  private addZone(listInfo: MapInfo[]) {
    listInfo.forEach((element) => {
      if (this.map) {
        let color: string;

        if (element.status === 'Bueno') {
          color = 'green';
        } else if (element.status === 'Moderado') {
          color = 'yellow';
        } else if (element.status === 'No saludable para grupos sensibles') {
          color = 'orange';
        } else if (element.status === 'No saludable') {
          color = 'red';
        } else if (element.status === 'No muy saludable') {
          color = 'purple';
        } else {
          color = 'brown';
        }

        L.circle([Number(element.latitude), Number(element.longitude)], {
          radius: 50,
          color: color,
        })
          .addTo(this.map)
          .bindPopup('Rango: ' + element.value);
      }
    });
  }

  getMapInfoaqicn() {
    this.mapInfoService.getMapInfoaqicn().subscribe(
      (resp) => {
        const mapInfoListAqicn: MapInfo[] = resp.map((item) => {
          const status = this.calculateStatus(item.aqi);

          return {
            name: item.station.name.replace(/,.*$/, ''),
            direction: item.station.name.replace(/^[^,]*,\s*/, ''),
            latitude: item.lat.toString(),
            longitude: item.lon.toString(),
            status: status,
            value: item.aqi,
          };
        });

        this.updateMapInfoList(mapInfoListAqicn);
        this.addZone(this.MapInfoList);
      },
      (error) => {
        console.error('Error al obtener datos de getMapInfoaqicn:', error);
      }
    );
  }

  private updateMapInfoList(newMapInfo: MapInfo[]): void {
    const listaCombinada = this.MapInfoList.concat(newMapInfo);
    this.MapInfoList = listaCombinada;
    this.dataSource.data = this.MapInfoList;
  }

  getColorClass(status: string): string {
    switch (status) {
      case 'Bueno':
        return 'green';
      case 'Moderado':
        return 'yellow';
      case 'No saludable para grupos sensibles':
        return 'orange';
      case 'No saludable':
        return 'red';
      case 'No muy saludable':
        return 'purple';
      default:
        return 'brown';
    }
  }

  private calculateStatus(valor: number): string {
    if (valor >= 0 && valor <= 50) {
      return 'Bueno';
    } else if (valor <= 100) {
      return 'Moderado';
    } else if (valor <= 150) {
      return 'No saludable para grupos sensibles';
    } else if (valor <= 200) {
      return 'No saludable';
    } else if (valor <= 300) {
      return 'No muy saludable';
    } else {
      return 'Peligrosos';
    }
  }
}
