import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageRoutingModule } from './users-page-routing.module';
import { UsersPage } from './users-page';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getSpanishPaginatorIntl } from 'src/app/common/locale/mat-paginator/spanish-paginator-intl';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserFormModule } from '../components/user-form-component/user-form.module';
import {MatTooltipModule} from '@angular/material/tooltip';




@NgModule({
  declarations: [UsersPage],
  imports: [
    CommonModule,
    UsersPageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    UserFormModule,
    MatTooltipModule

  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }],
})
export class UsersPageModule { }
