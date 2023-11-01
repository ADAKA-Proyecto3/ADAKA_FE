import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NgStyle, NgFor, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatMenuModule,
    NgStyle,
    NgFor,
    NgIf
  ],
  exports: [NavbarComponent],
})
export class NavbarModule {}
