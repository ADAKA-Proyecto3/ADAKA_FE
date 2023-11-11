import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import * as L from 'leaflet';
import { Map, circle, marker, tileLayer } from 'leaflet';
import { filter, take } from 'rxjs';
import { MapInfo } from 'src/app/models/map-info.interface';
import { MapInfoHttpService } from 'src/app/services/http-service/mapInfo-http.service';
import { loadMapInfo } from 'src/app/store/actions/mapInfo.actions';
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
export class MapPage implements AfterViewInit {
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
    this.getMapInfoaqicn();
    this.store.dispatch(loadMapInfo());
    this.loadInfo();
  }

  ngAfterViewInit(): void {
    this.store.select('mapInfo').subscribe(({ mapInfo }) => {
      const listaCombinada = this.MapInfoList.concat(mapInfo);
      this.MapInfoList = listaCombinada;
      this.dataSource.data = this.MapInfoList;
    });
    this.dataSource.paginator = this.paginator;
    this.initializeInfoData();
  }

  private initializeInfoData(): void {
    console.log()
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

  private loadInfo() {
    this.store
      .select('mapInfo')
      .pipe(
        filter((mapInfo) => mapInfo.status === 'success'),
        take(1)
      )
      .subscribe((mapInfo) => {
        this.createMap();
      });
  }

  private createMap() {
    this.map = L.map('map').setView(this.view.center, this.view.zoom);

    const tileLayerOptions = {
      minZoom: 0,
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      ext: 'png',
    };

    tileLayer(
      'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}',
      tileLayerOptions
    ).addTo(this.map);

    this.addZone(this.MapInfoList);
  }

  cambiarVista(mapInfo: MapInfo) {
    if (this.map) {
      // Asegúrate de que el mapa esté inicializado
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
          .bindPopup("Rango: " +element.valor);
      }
    });
  }

  getMapInfoaqicn() {
    this.mapInfoService.getMapInfoaqicn().subscribe(
      (resp) => {
        const mapInfoListAqicn: MapInfo[] = resp.map((item) => {
          let status: string;

          if (item.aqi >= 0 && item.aqi <= 50) {
            status = 'Bueno';
          } else if (item.aqi <= 100) {
            status = 'Moderado';
          } else if (item.aqi <= 150) {
            status = 'No saludable para grupos sensibles';
          } else if (item.aqi <= 200) {
            status = 'No saludable';
          } else if (item.aqi <= 300) {
            status = 'No muy saludable';
          } else {
            status = 'Peligrosos';
          }

          return {
            name: item.station.name.replace(/,.*$/, ''), // Obtener el nombre sin la coma y el resto
            direction: item.station.name.replace(/^[^,]*,\s*/, ''), // Obtener el resto sin el nombre
            latitude: item.lat.toString(),
            longitude: item.lon.toString(),
            status: status,
            valor: item.aqi
          };
        });

        const listaCombinada = this.MapInfoList.concat(mapInfoListAqicn);
        this.MapInfoList = listaCombinada;
        this.dataSource.data = this.MapInfoList;
        this.dataSource.paginator = this.paginator;
        this.addZone(this.MapInfoList);
      },
      (error) => {
        console.error('Error al obtener datos de getMapInfoaqicn:', error);
      }
    );
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
}
