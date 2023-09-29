import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageRoutingModule } from './users-page-routing.module';
import { UsersPage } from './users-page';




@NgModule({
  declarations: [UsersPage],
  imports: [
    CommonModule,
    UsersPageRoutingModule
  ]
})
export class UsersPageModule { }
