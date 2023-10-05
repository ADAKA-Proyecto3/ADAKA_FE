import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
      console.log("Aqui se envia la otp")
    }
  }
}
