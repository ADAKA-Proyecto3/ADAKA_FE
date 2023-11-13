// password-recovery-page.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { EmailSenderHttpService } from 'src/app/services/http-service/email_sender-http.service';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import Swal from 'sweetalert2';
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
    private emailSenderService: EmailSenderHttpService // Inyecta el servicio aquí
  ) {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  
  ngOnInit(): void {
    // Puedes eliminar esta línea ya que ya estás inicializando el formulario en el constructor
  }

  public returnToLogin(): void {
    this.router.navigateByUrl(`${UrlPages.AUTH}/${UrlPages.LOGIN}`);
  }

  sendRecoveryCode() {

    if (this.recoveryForm.invalid) {
      return;
    }

    const email: string =  this.recoveryForm.value.email;
      
    this.emailSenderService.sendPasswordRecoveryInstructions(email)
    .subscribe({
      next: (response) => {
        console.log('Correo electrónico enviado con éxito', response);
        this.codeSent = true;
  
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se han enviado instrucciones a su correo',
          confirmButtonText: 'Ir a login',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('auth/login'); 
          }
        });
      },
      error: (error) => {
        console.error('Error al enviar el correo electrónico', error);
      }
    });
  
    }
  public error = (controlName: string, errorName: string) => {
    return this.recoveryForm.controls[controlName].hasError(errorName);
  };
}
