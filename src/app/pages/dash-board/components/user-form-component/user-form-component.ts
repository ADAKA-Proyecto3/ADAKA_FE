import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SelectOption } from 'src/app/common/interfaces/option.interface';
import { User } from 'src/app/models/user.interface';
import { DebugerService } from 'src/app/services/debug-service/debug.service';



@Component({
  selector: 'app-user-form-component',
  templateUrl: './user-form-component.html',
  styleUrls: ['./user-form-component.scss'],
})
export class UserFormComponent implements OnInit {
  public registerForm: FormGroup = {} as FormGroup;

  selectedValue: string = '';

  roles: SelectOption[] = [
    { value: 'ADMIN', viewValue: 'Admin' },
    { value: 'NURSE', viewValue: 'Enfermero' },
  ];

  status: SelectOption[] = [
    { value: 'ACTIVE', viewValue: 'Activo' },
    { value: 'INACTIVE', viewValue: 'Inactivo' },
  ];

  editing = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User | undefined,
    private matDialogRef: MatDialogRef<UserFormComponent>
  ) {
    matDialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      role: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

    if (this.user) {
      this.editing = true;

      this.registerForm.patchValue({
        name: this.user.name || '',
        role: this.user.role || '',
        phone: this.user.phone || '',
        email: this.user.email || '',
        status: this.user.status || '',
      });
    }
  }

 

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const user: User = {
      name: this.registerForm.value.name,
      role: this.registerForm.value.role,
      phone: this.registerForm.value.phone,
      email: this.registerForm.value.email,
      status: this.registerForm.value.status,
    };

    if (this.editing) {
      this.matDialogRef.close( {id: this.user?.id, user: user} );
    }else{
      DebugerService.log('NO EDITING');
      this.matDialogRef.close({user: user});
    }

  
  }

  closeDialog() {
    this.matDialogRef.close();
  }


  public error = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };
}
