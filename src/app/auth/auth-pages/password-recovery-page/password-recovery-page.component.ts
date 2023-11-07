import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-password-recovery-page',
  templateUrl: './password-recovery-page.component.html',
  styleUrls: ['./password-recovery-page.component.scss'],
})

export class PasswordRecoveryPage implements OnInit {
  recoveryForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  

  ngOnInit(): void {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendRecoveryCode() {
    if (this.recoveryForm.valid) {
      
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

  public error = (controlName: string, errorName: string) => {
    return this.recoveryForm.controls[controlName].hasError(errorName);
  };
}
