import { Injectable, inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

//@Injectable({providedIn: 'root'})


export const authGuard:CanActivateFn = () =>{
    const authService = inject(AuthService);

    const isAuth = authService.checkAuthentication();

    return true;

  
}

