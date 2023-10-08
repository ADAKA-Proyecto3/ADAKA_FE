import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';






@NgModule({
  declarations: [ HomePage, ],
  imports: [
    HomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
   
   
  ]
})
export class HomeModule { }
