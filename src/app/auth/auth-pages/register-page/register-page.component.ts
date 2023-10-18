import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthCustomDialogComponent } from '../../components/auth-dialog/auth-custom-dialog.component';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { RegisterPageController } from './register-page.controller';
import { User } from '../../../models/user.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup = {} as FormGroup;
  paidFor = false;
  constructor(
    private readonly registerPageController: RegisterPageController,
    private readonly router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        // this.passwordValidator,
      ]),
    });
  }

   openDialog() {
    const dialogRef = this.dialog.open(AuthCustomDialogComponent, {
      //width: '60%',
    });

     dialogRef.afterClosed().subscribe( async (result) => {
      if (result && result.paidFor) {
        this.paidFor = result.paidFor;
        await  this.submitRegistration();
        //this.paidFor===true ? this.router.navigateByUrl( `${UrlPages.AUTH}/${UrlPages.LOGIN}`) : null;
      }
    });
  }

  private async submitRegistration() {
    if (this.paidFor === true) {

      const user: User = {
        name: this.registerForm.value.name,
        phone: this.registerForm.value.phone,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        role: 'ADMIN',
        status: 'ACTIVE',
      } 

      const userRegistration = await this.registerPageController.registerUser(user);

      //this.router.navigateByUrl( `${UrlPages.AUTH}/${UrlPages.LOGIN}`);
    }
  }

  public onContinue() {}

  public onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.openDialog();
  }

  public error = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };

  private passwordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    if (hasNumber && hasSpecial && hasUpperCase && password.length >= 8) {
      return null;
    }

    return { invalidPassword: true };
  }

  returnToLogin() {
    this.router.navigateByUrl( `${UrlPages.AUTH}/${UrlPages.LOGIN}`);
  }

  
}
