// password-recovery-page.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { PasswordRecoveryPageController } from './password-recovery-page.controller';
 // Asegúrate de especificar la ruta correcta

@Component({
  selector: 'app-password-recovery-page',
  templateUrl: './password-recovery-page.component.html',
  styleUrls: ['./password-recovery-page.component.scss'],
})
export class PasswordRecoveryPage implements OnInit{
  
  codeSent: Boolean = false;

  recoveryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly passwordRecoveryPageController: PasswordRecoveryPageController,
  ) {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  
  ngOnInit(): void {
  }

  public returnToLogin(): void {
    this.router.navigateByUrl(`${UrlPages.AUTH}/${UrlPages.LOGIN}`);
  }

  sendRecoveryCode() {

    if (this.recoveryForm.invalid) {
      return;
    }

    const email: string =  this.recoveryForm.value.email;
    
    this.passwordRecoveryPageController.sendPasswordRecoveryEmail(email);
  
    }

  public error = (controlName: string, errorName: string) => {
    return this.recoveryForm.controls[controlName].hasError(errorName);
  };
}
