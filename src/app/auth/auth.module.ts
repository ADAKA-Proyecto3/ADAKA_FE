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

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'; 
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AuthLayoutPage,
    RegisterPage,
    PasswordRecoveryPage,
    LoginPage,
    
   
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
    HttpClientModule
   
  ],

})
export class AuthModule { }
