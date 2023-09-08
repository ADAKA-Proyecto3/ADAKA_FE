import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { Routes } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';




@NgModule({
  declarations: [ HomePage, ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
