import { Injectable } from '@angular/core';
import { UserHttpService } from 'src/app/services/http-service/user-http.service';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { AuthService } from '../../services/auth.service';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { Utils } from 'src/app/common/utils/app-util';


@Injectable()
export class RegisterPageController {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly userHttpService: UserHttpService,
    private readonly authHttpService: AuthService,
    private readonly dialogService: DialogService,
    private readonly pageRouter: PageRouterService
  ) {}

  async registerUser(suscription: any): Promise<any> {
    this.loadingService.showLoadingModal();

    try {
      DebugerService.log('Requesting HTTP POST Register Admin');
      const result = await this.userHttpService.registerAdmin(suscription);

      if (result.id) {
        this.dialogService.showToast('Suscripción registrada con éxito');
        setTimeout(() => {
          this.pageRouter.route(`${UrlPages.AUTH}/${UrlPages.LOGIN}`);
        }, 3000);
      }
    } catch (error) {
      Utils.showNotification({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error al registrar la suscripción',
      });
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

  async requestLogin(email: string, password: string) {
    this.loadingService.showLoadingModal();

    try {
      DebugerService.log('Requesting HTTP login');
      const loginRequest: any = {
        email: email,
        password: password,
      };
      const result = await this.authHttpService.login(loginRequest);
     
      return result;
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }
}
