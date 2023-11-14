import { Injectable } from '@angular/core';
import { LoadingService } from 'src/app/services/loading-service/loading.service';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { AuthService } from '../../services/auth.service';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { Utils } from 'src/app/common/utils/app-util';


@Injectable()
export class PasswordRecoveryPageController {
  constructor(
    private readonly loadingService: LoadingService,
    private readonly authHttpService: AuthService,
    private readonly dialogService: DialogService,
    private readonly pageRouter: PageRouterService
  ) {}

  async sendPasswordRecoveryEmail(email: string): Promise<any> {
    this.loadingService.showLoadingModal();
    try {

      const result = await this.authHttpService.sendPasswordRecoveryInstructions(email);

      if (result) {
        this.dialogService.showToast('Correo con contraseña enviada con éxito');
        setTimeout(() => {
          this.pageRouter.route(`${UrlPages.AUTH}/${UrlPages.LOGIN}`);
        }, 3000);
      }
    } catch (error) {
      Utils.showNotification({
        icon: 'error',
        title: 'Error',
        text: 'No se ha encontrado una cuenta asociada a ese correo',
      });
      console.error(error);
    } finally {
      this.loadingService.dismiss();
    }
  }

}
