import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterPage } from './auth-pages/register-page/register-page.component';
import { AuthLayoutPage } from './auth-pages/auth-layout-page/auth-layout-page.component';
import { PasswordRecoveryPage } from './auth-pages/password-recovery-page/password-recovery-page.component';
import { LoginPage } from './auth-pages/login-page/login-page';

import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { AuthCustomDialogComponent } from './components/auth-dialog/auth-custom-dialog.component';
import { MatListModule } from '@angular/material/list';
import { RegisterPageController } from './auth-pages/register-page/register-page.controller';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    AuthLayoutPage,
    RegisterPage,
    PasswordRecoveryPage,
    LoginPage,
    AuthCustomDialogComponent
    
   
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    MatListModule,
    MatStepperModule,
    MatSelectModule
   
  ],

  providers: [ RegisterPageController ],

})
export class AuthModule { }
