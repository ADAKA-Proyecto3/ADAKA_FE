import { NgModule } from '@angular/core';
import { NgClass } from '@angular/common';
import { MapPage } from './map.page';
import { MapPageRoutingModule } from './map-page-routing.module';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [ MapPage ],
  imports: [
    NgClass,
    MapPageRoutingModule,
    NavbarModule,
    FooterComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class MapModule { }
