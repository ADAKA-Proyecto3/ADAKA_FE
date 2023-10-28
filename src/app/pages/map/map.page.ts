import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Map, circle, marker, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements AfterViewInit {



  ngAfterViewInit(): void {
    const map = new Map('map').setView([9.9202, -84.1031], 9);
    
    const tileLayerOptions = {
      minZoom: 0,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      ext: 'png',
    };

    
    tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', tileLayerOptions).addTo(map);

    circle([9.93421, -84.08595], { 
      radius: 300,
      color: 'blue',
    }).addTo(map).bindPopup('Hospital San Juan de Dios: Muy Bueno');

    circle([9.93692, -84.1036], { 
      radius: 500,
      color: 'green',
    }).addTo(map).bindPopup('Sabana');


    circle([9.93589, -84.08676], { 
      radius: 500,
      color: 'red',
    }).addTo(map).bindPopup('CocaCola');



  }

}
