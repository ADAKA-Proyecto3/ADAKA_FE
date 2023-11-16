import { Injectable } from '@angular/core';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { AuthService } from '../../services/auth.service';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { Utils } from 'src/app/common/utils/app-util';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadActiveUser } from 'src/app/store/actions/activeUser.actions';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { Subscription } from 'rxjs';

type LoginRequest = {
  email: string;
  password: string;
};

@Injectable()
export class loginPageController {

  private activeUserSuscription: Subscription = new Subscription();
  
  constructor(
    private readonly loadingService: LoadingService,
    private readonly authService: AuthService,
    private readonly pageRouter: PageRouterService,
    private readonly store: Store<AppState>
  ) {}

  async requestLogin(email: string, password: string): Promise<void> {
    this.loadingService.showLoadingModal();

    try {
      DebugerService.log('Requesting HTTP login');
      const loginRequest: LoginRequest = {
        email: email,
        password: password,
      };

      const result = await this.authService.login(loginRequest);
      const accessToken = result.token;
      if (accessToken) {
        const claims = JSON.parse(atob(accessToken.split('.')[1]));
        sessionStorage.setItem('token', `Bearer ${accessToken}`);
        sessionStorage.setItem(
          'login',
          JSON.stringify({
            isAuth: true,
            isAdmin: claims.isAdmin,
            user: claims.username,
          })
        );

         this.authService.checkSignedInUser();

         this.routerUser()
        //this.pageRouter.route(UrlPages.DASHBOARD);
      }
    } catch (error: any) {
      DebugerService.log('Login Error: ' + error.error.error);

      this.showErrorMessage(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  private showErrorMessage(error: any): void {
    var message: string = 'Usuario o contraseña incorrectos';
    if (error.error.error === 'User account is locked') {
      message = 'Usuario inactivo, contacte su administrador';
    }

    Utils.showNotification({
      icon: 'error',
      text: message,
      title: 'Error',
      showConfirmButton: true,
    });
  }

  private routerUser(): void {
    this.activeUserSuscription = this.store.select((state)=> state.user.activeUser).subscribe((activeUser)=> {
      if(activeUser.status === 'FREEZE'){
        this.pageRouter.route(`${UrlPages.DASHBOARD}/${UrlPages.PROFILE}`);
        this.unsubscribe();

      }else{
        this.pageRouter.route(UrlPages.DASHBOARD);
        this.unsubscribe();
      }
        
    });
  }

  private unsubscribe(): void {
    this.activeUserSuscription.unsubscribe();
  }
}
