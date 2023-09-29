import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';





@NgModule({
  declarations: [ HomePage, ],
  imports: [
    //CommonModule,
    HomeRoutingModule,
    NavbarModule
   
  ]
})
export class HomeModule { }
