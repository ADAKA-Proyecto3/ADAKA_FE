import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'src/app/components/card/card.module';
import { PlansPage } from './plans.page';
import { PlansPageRoutingModule } from './plans-routing.module';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlansPage],
  imports: [
    CommonModule,
    PlansPageRoutingModule,
    CardModule,
    FooterComponent,
    NavbarModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule
  ],
})
export class PlansModule {}
