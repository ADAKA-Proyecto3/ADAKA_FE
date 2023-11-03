import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageRoutingModule } from './layout-page-routing.module';
import { LayoutPage } from './layout-page';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NgStyle, NgFor } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [LayoutPage],
  imports: [
    CommonModule,
    LayoutPageRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatTooltipModule,
    NgStyle,
    NgFor,
  ],
})
export class LayoutPageModule {}
