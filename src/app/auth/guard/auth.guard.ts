import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';


export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  const isAuth = authService.checkAuthentication();
  DebugerService.log('isAuth: '+  isAuth);


  return isAuth;
};

export const authGuardChild: CanActivateFn = () => {
  const authService = inject(AuthService);
  const pageRoutingService = inject(PageRouterService);

  const isAdmin = authService.isAdmin();

  if (!isAdmin) {
    pageRoutingService.route(`${UrlPages.DASHBOARD}/${UrlPages.MAIN}}`);
  }

  DebugerService.log('isAdmin: '+  isAdmin);

  return isAdmin;
}
