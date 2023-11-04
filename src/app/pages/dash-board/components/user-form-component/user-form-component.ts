import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SelectOption } from 'src/app/common/interfaces/option.interface';
import { User } from 'src/app/models/user.interface';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { AppState } from 'src/app/store/app.state';
import { loadMedicalCenter } from '../../../../store/actions/medicalCenter.actions';

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

  medicalCenterOptions: SelectOption[] = [];
  activeUser: any;

  editing = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User | undefined,
    private matDialogRef: MatDialogRef<UserFormComponent>,
    private readonly store: Store<AppState>
  ) {
    matDialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.store
      .select((state) => state.user.activeUser.id)
      .subscribe((id) => {
        this.activeUser = id;
     
        this.loadMedicalCenters(this.activeUser);

       
      });



    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      role: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      medicalCenter: new FormControl('', [Validators.required]),
    });

    if (this.user) {
      this.editing = true;

      this.registerForm.patchValue({
        name: this.user.name || '',
        role: this.user.role || '',
        phone: this.user.phone || '',
        email: this.user.email || '',
        status: this.user.status || '',
        medicalCenter: this.user.assignedMedicalCenter || '',
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
      //manager: this.activeUser,
      //assignedMedicalCenter: this.registerForm.value.medicalCenter,

    };

    if (this.editing) {
      user.manager = this.activeUser;
      user.assignedMedicalCenter = this.registerForm.value.medicalCenter;
      this.matDialogRef.close({ id: this.user?.id, user: user });
    } else {
      DebugerService.log('NO EDITING');
      this.matDialogRef.close({ user: user, parentId: this.activeUser, medicalCenterId: this.registerForm.value.medicalCenter });
    }
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  public error = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };

  loadMedicalCenters(userId: number) {
    this.store.dispatch(loadMedicalCenter({ id: userId }));


    this.store
    .select((state) => state.medicalCenters.medicalCenters)
    .subscribe((medicalCenters) => {
      this.medicalCenterOptions = medicalCenters.map((mc) => {
        return { value: mc.id!, viewValue: mc.name };
      });
    });
  }


  private getMedicalCenterName(id: number) {
    
    return this.medicalCenterOptions.find((mc) => mc.value === id)?.viewValue;
  }
}
