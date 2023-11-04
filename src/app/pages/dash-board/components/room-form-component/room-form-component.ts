import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicalCenter } from 'src/app/models/medical-center.interface';
import { Room } from 'src/app/models/rooms.interface';
import { User } from 'src/app/models/user.interface';
import { DebugerService } from 'src/app/services/debug-service/debug.service';

interface SelectOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-room-form-component',
  templateUrl: './room-form-component.html',
  styleUrls: ['./room-form-component.scss'],
})
export class RoomFormComponent implements OnInit {
  public registerForm: FormGroup = {} as FormGroup;

  medicalCenterList: MedicalCenter[] = [
    {
      id: 1,
      name: "Sample Medical Center",
      status: "Open",
      phone: "123-456-7890",
      address: "123 Main Street",
      coordenates: {
        latitude: 40.7128,
        longitude: -74.0060,
      }
    },{
        id: 2,
        name: "Sample Medical Center",
        status: "Open",
        phone: "123-456-7890",
        address: "123 Main Street",
        coordenates: {
          latitude: 40.7128,
          longitude: -74.0060,
        }
    },
    {
      id: 2,
      name: "Sample Medical Center",
      status: "Open",
      phone: "123-456-7890",
      address: "123 Main Street",
      coordenates: {
        latitude: 40.7128,
        longitude: -74.0060,
      }
  }
  ];

  selectedValue: string = '';

  roles: SelectOption[] = [
    { value: 'ADMIN', viewValue: 'Admin' },
    { value: 'NURSE', viewValue: 'Enfermero' },
  ];

  medicalCenter: SelectOption[] = [
    { value: 'Medical Center', viewValue: 'Activo' },
    { value: 'INACTIVE', viewValue: 'Inactivo' },
  ];

  editing = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public room: Room | undefined,
    private matDialogRef: MatDialogRef<RoomFormComponent>
  ) {
    matDialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.initilizeProperties();
  }


  initilizeProperties() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      length: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });

    if (this.room) {
      this.editing = true;

      this.registerForm.patchValue({
        name: this.room.name || '',
        length: this.room.length || '',
        width: this.room.width || '',
        height: this.room.height || '',
        medicalCenter: this.room.medicalCenter || '',
      });
    }


  }
 

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
  
    const room: Room = {
      name: this.registerForm.value.name,
      length: this.registerForm.value.length,
      width: this.registerForm.value.width,
      height: this.registerForm.value.height,
      medicalCenter: this.registerForm.value.medicalCenter,
    }
  
    if (this.editing) {
      this.matDialogRef.close({ id: this.room?.id, room: room });
    } else {
      DebugerService.log('NO EDITING');
      this.matDialogRef.close({ room: room });
    }
  }

  closeDialog() {
    this.matDialogRef.close();
  }


  public error = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };
}
