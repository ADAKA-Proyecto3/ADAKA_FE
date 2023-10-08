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

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup = {} as FormGroup;
  paidFor = false;
  constructor(private readonly router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        // this.passwordValidator,
      ]),
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AuthCustomDialogComponent, {
      width: '60%',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.paidFor) {
        this.paidFor = result.paidFor; 
        this.paidFor===true ? this.router.navigateByUrl( `${UrlPages.AUTH}/${UrlPages.LOGIN}`) : null;
        
      }
    });
  }

  public onContinue() {}

  public onSubmit() {
    this.openDialog();

    if (this.registerForm.valid) {
    }
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
}
