import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerModule } from './components/spinner/spinner.module';
import { AuthModule } from './auth/auth.module';
import { NavbarModule } from './components/navbar/navbar.module';



@NgModule({
  declarations: [ AppComponent  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SpinnerModule,
    NavbarModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
