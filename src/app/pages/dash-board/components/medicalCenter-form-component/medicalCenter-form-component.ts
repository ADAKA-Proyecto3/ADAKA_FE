import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicalCenter } from 'src/app/models/medical-center.interface';
import { DebugerService } from 'src/app/services/debug-service/debug.service';

interface SelectOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-medicalCenter-form-component',
  templateUrl: './medicalCenter-form-component.html',
  styleUrls: ['./medicalCenter-form-component.scss'],
})
export class MedicalCenterFormComponent implements OnInit {
  public registerForm: FormGroup = {} as FormGroup;

  selectedValue: string = '';

  status: SelectOption[] = [
    { value: 'ACTIVE', viewValue: 'Activo' },
    { value: 'INACTIVE', viewValue: 'Inactivo' },
  ];

  editing = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public medicalCenter: MedicalCenter | undefined,
    private matDialogRef: MatDialogRef<MedicalCenterFormComponent>
  ) {
    matDialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
      ]),
      email: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      direction: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required]),
    });

    if (this.medicalCenter) {
      this.editing = true;

      this.registerForm.patchValue({
        name: this.medicalCenter.name || '',
        direction: this.medicalCenter.direction || '',
        email: this.medicalCenter.email || '',
        status: this.medicalCenter.status || '',
        latitude: this.medicalCenter.latitude || '',
        longitude: this.medicalCenter.longitude || ''
      });
    }
  }



  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const medicalCenter: MedicalCenter = {
      name: this.registerForm.value.name,
      direction: this.registerForm.value.direction,
      email: this.registerForm.value.email,
      status: this.registerForm.value.status,
      latitude: this.registerForm.value.latitude, 
      longitude: this.registerForm.value.longitude
    };

    if (this.editing) {
      this.matDialogRef.close( {id: this.medicalCenter?.id, medicalCenter: medicalCenter} );
    }else{
      DebugerService.log('NO EDITING');
      this.matDialogRef.close({medicalCenter: medicalCenter});
    }

  }

  closeDialog() {
    this.matDialogRef.close();
  }


  public error = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };
}
