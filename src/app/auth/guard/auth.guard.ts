import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DebugerService } from 'src/app/services/debug-service/debug.service';


export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  const isAuth = authService.checkAuthentication();
  DebugerService.log('isAuth: '+  isAuth);

  return isAuth;
};
