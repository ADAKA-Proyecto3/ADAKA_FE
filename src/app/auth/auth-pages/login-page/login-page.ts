import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup = {} as FormGroup;
  constructor(
    private readonly router: Router,
    private authService : AuthService
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
    console.log('returnToHome');
    this.router.navigate(['/']);
  }

  public goToRegister(): void {
    console.log('goToRegister');
    this.router.navigateByUrl( `${UrlPages.AUTH}/${UrlPages.REGISTER}`);
  }

  public goToPasswordRecovery(): void {
    console.log('goToPasswordRecovery');
    this.router.navigateByUrl( `${UrlPages.AUTH}/${UrlPages.PASSWORD_RECOVERY}`);
  }

  public onSubmit() {
    //TODO: Implementar lógica de login
    if (this.loginForm.invalid) return;

    if (this.authService.login(this.loginForm.value.email, this.loginForm.value.password)) {
      
      this.router.navigate([UrlPages.DASHBOARD]);
    }

    // this.authService.login( this.loginForm.value.email, this.loginForm.value.password )
    // .subscribe( (user) => {
    //   this.router.navigate([UrlPages.HOME]);
    // } );

    console.log({
      formValid: this.loginForm.valid,
      formValue: this.loginForm.value,
    });
  }
}
