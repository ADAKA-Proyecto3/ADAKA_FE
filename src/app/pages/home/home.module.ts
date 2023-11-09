import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';


@NgModule({
  declarations: [HomePage ],
  imports: [
    HomeRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    NgIf,
    FooterComponent,
    NavbarModule
  ],
})
export class HomeModule {}
