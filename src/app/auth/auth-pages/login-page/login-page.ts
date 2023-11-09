import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { loginPageController } from './login-page.controller';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup = {} as FormGroup;
  hide = true;
  constructor(
    
    private loginPageController: loginPageController,
    private readonly pageRouter: PageRouterService
   
  ) {}

  public ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public myError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  public returnToHome(): void {
    this.pageRouter.route('/');
  }

  public goToRegister(): void {
    this.pageRouter.route(`${UrlPages.AUTH}/${UrlPages.REGISTER}`);
  }

  public goToPasswordRecovery(): void {
    this.pageRouter.route(`${UrlPages.AUTH}/${UrlPages.PASSWORD_RECOVERY}`);
  }

  public async onSubmit() {
    if (this.loginForm.invalid) return;

    const loginRequestResult = await this.loginPageController.requestLogin(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    DebugerService.log('loginRequestResult: ' + loginRequestResult);

    if (loginRequestResult) {
      this.pageRouter.route(UrlPages.DASHBOARD);
    }
  }

 
}
