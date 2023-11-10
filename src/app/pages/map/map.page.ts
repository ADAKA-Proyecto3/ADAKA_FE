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
    zoom: 9
  };

  constructor(private store: Store<AppState>, private mapInfoService: MapInfoHttpService) {}

  displayedColumns: string[] = [
    'name',
    'direction',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<MapInfo>();

  ngOnInit(): void {
    this.getMapInfoaqicn();
    this.store.dispatch(loadMapInfo());
    this.loadInfo();
  }

  ngAfterViewInit(): void {
    this.store.select('mapInfo').subscribe(({ mapInfo }) => {
      const listaCombinada =  this.MapInfoList.concat(mapInfo);
        this.MapInfoList = listaCombinada;
      this.dataSource.data = this.MapInfoList;
      
    });
    this.dataSource.paginator = this.paginator;
  }
  private loadInfo() {
    this.store
      .select('mapInfo')
      .pipe(
        filter(
          (mapInfo) =>
          mapInfo.status === "success"
        ),
        take(1)
      )
      .subscribe((mapInfo) => {

        this.createMap();
        
      });
  }

  private createMap(){
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
  
    if (this.map) { // Asegúrate de que el mapa esté inicializado
      this.map.setView([Number(mapInfo.latitude), Number(mapInfo.longitude)], 15);
    }
  }

  private addZone(listInfo: MapInfo[]){
    listInfo.forEach(element => {
      if (this.map) {

        let color: string;

        if (element.status === 'Saludable') {
          color = 'green';
        } else if (element.status === 'Moderada') {
          color = 'yellow';
        } else if (element.status === 'No saludable para ciertos grupos') {
          color = 'orange';
        } else if (element.status === 'No saludable') {
          color = 'red';
        } else if (element.status === 'Muy poco saludable') {
          color = 'purple';
        } else {
          color = 'brown';
        }

        L.circle([Number(element.latitude), Number(element.longitude)], {
          radius: 250,
          color: color,
        })
        .addTo(this.map)
        .bindPopup(element.name);
      }
    });
  }

  getMapInfoaqicn() {
    this.mapInfoService.getMapInfoaqicn().subscribe(
      resp => {
       
        const mapInfoListAqicn: MapInfo[] = resp.map(item => {
          let status: string;

          if (item.aqi >= 0 && item.aqi <= 50) {
            status = 'Saludable';
          } else if (item.aqi <= 100) {
            status = 'Moderada';
          } else if (item.aqi <= 150) {
            status = 'No saludable para ciertos grupos';
          } else if (item.aqi <= 200) {
            status = 'No saludable';
          } else if (item.aqi <= 300) {
            status = 'Muy poco saludable';
          } else {
            status = 'Peligrosos';
          }

          return {
            name: item.station.name.replace(/,.*$/, ''), // Obtener el nombre sin la coma y el resto
            direction: item.station.name.replace(/^[^,]*,\s*/, ''), // Obtener el resto sin el nombre
            latitude: item.lat.toString(),
            longitude: item.lon.toString(),
            status: status,
          };
        });

        const listaCombinada =  this.MapInfoList.concat(mapInfoListAqicn);
        this.MapInfoList = listaCombinada;
        this.dataSource.data = this.MapInfoList;
        this.dataSource.paginator = this.paginator;
        this.addZone( this.MapInfoList);
      },
      error => {
        console.error('Error al obtener datos de getMapInfoaqicn:', error);
      }
    );
  }
}
