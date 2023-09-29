import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutPage } from './auth-pages/auth-layout-page/auth-layout-page.component';
import { LoginPage } from './auth-pages/login-page/login-page';
import { RegisterPage } from './auth-pages/register-page/register-page.component';
import { PasswordRecoveryPage } from './auth-pages/password-recovery-page/password-recovery-page.component';
import { UrlPages } from '../common/enums/url-pages.enum';

const routes: Routes = [
  {
    path: UrlPages.AUTH,
    component: AuthLayoutPage,
    children:[
      { path: UrlPages.LOGIN, component: LoginPage },
      { path: UrlPages.REGISTER, component: RegisterPage },
      { path: UrlPages.PASSWORD_RECOVERY, component: PasswordRecoveryPage },
      { path:'**', redirectTo: UrlPages.LOGIN },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
