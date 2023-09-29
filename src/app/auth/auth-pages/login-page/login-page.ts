import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';

@Component({
  selector: 'app-loginpage',
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup = {} as FormGroup;
  constructor(
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public myError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  //emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  returnToHome() {
    this.router.navigate(['/']);
  }
}
