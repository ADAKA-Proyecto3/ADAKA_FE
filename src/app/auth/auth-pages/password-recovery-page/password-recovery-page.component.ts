import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-password-recovery-page',
  templateUrl: './password-recovery-page.component.html',
  styleUrls: ['./password-recovery-page.component.scss'],
})

export class PasswordRecoveryPage implements OnInit {
  
  codeSent: Boolean = false;

  recoveryForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private readonly router: Router,) {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  
  ngOnInit(): void {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public returnToLogin(): void {
    this.router.navigateByUrl(`${UrlPages.AUTH}/${UrlPages.LOGIN}`);
  }

  sendRecoveryCode() {
    if (this.recoveryForm.valid) {
      // http post password recovery email
      // if (http response de enviado es true) then
      this.codeSent = true;
      if (this.codeSent){
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Se han enviado instrucciones a su correo',
        confirmButtonText: 'Ir a login',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = 'auth/login'; 
        }
      });
    }
  }
  }

  public error = (controlName: string, errorName: string) => {
    return this.recoveryForm.controls[controlName].hasError(errorName);
  };
}
