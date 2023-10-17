import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-medical-center-registration-page',
  templateUrl: './medical-center-registration-page.html',
  styleUrls: ['./medical-center-registration-page.scss']
})
export class MedicalCenterRegistrationPage {
  public medicalRegistrationForm: FormGroup = {} as FormGroup;
  estados = ['Activo', 'Inactivo']; // Define the estados array here
  constructor(private fb: FormBuilder) {
    this.medicalRegistrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      estado: ['Activo', Validators.required],
      phoneNumber: ['', Validators.required],
      direccion: ['', Validators.required],
      coordenadas: ['', Validators.required],
    });
  }
  public Error = (controlName: string, errorName: string) => {
    return this.medicalRegistrationForm.controls[controlName].hasError(errorName);
  };
  onSubmit() {}
}

