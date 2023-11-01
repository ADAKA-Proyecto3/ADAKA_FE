import { Injectable } from '@angular/core';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { AuthService } from '../../services/auth.service';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import Swal from 'sweetalert2';
import { Utils } from 'src/app/common/utils/notification-util';

type LoginRequest = {
  email: string;
  password: string;
};

@Injectable()
export class loginPageController {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly authService: AuthService
  ) {}

  async requestLogin(email: string, password: string): Promise<boolean> {
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

        return true;
      } else {
        return false;
      }
    } catch (error) {
      DebugerService.log('Login Error: ' + error);

      Utils.showNotification({
        icon: 'error',
        text: 'Usuario o contraseña incorrectos',
        title: 'Error',
        showConfirmButton: true,
      });

      return false;
    } finally {
      this.loadingService.dismiss();
    }
  }
}
