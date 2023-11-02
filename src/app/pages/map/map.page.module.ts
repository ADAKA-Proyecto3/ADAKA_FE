import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPage } from './map.page';
import { MapPageRoutingModule } from './map-page-routing.module';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FooterComponent } from 'src/app/components/footer/footer.component';



@NgModule({
  declarations: [ MapPage ],
  imports: [
    CommonModule,
    MapPageRoutingModule,
    NavbarModule,
    FooterComponent
  ]
})
export class MapModule { }
