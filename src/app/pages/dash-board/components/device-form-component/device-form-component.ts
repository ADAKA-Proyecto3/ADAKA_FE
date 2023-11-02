import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Device } from 'src/app/models/devices.interface';
import { DebugerService } from 'src/app/services/debug-service/debug.service';

interface SelectOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-device-form-component',
  templateUrl: './device-form-component.html',
  styleUrls: ['./device-form-component.scss'],
})
export class DeviceFormComponent implements OnInit {
  public registerForm: FormGroup = {} as FormGroup;

  selectedValue: string = '';

  editing = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public device: Device | undefined,
    private matDialogRef: MatDialogRef<DeviceFormComponent>
  ) {
    matDialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.initilizeProperties();
  }


  initilizeProperties() {
    
    this.registerForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      model: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      installationDate: new FormControl('', [Validators.required]),
      room: new FormControl('', [Validators.required]),

    });

    if (this.device) {
      this.editing = true;

      this.registerForm.patchValue({
        id: this.device.id || '',
        model: this.device.model || '',
        installatonDate: this.device.installationDate || '',
        room: this.device.room || '',
      });
    }


  }
 

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const device: Device = {
      id: this.registerForm.value.id,
      model: this.registerForm.value.model,
      installationDate: this.registerForm.value.installationDate,
      room: this.registerForm.value.room,
    };

    if (this.editing) {
      this.matDialogRef.close( {id: this.device?.id, device: device} );
    }else{
      DebugerService.log('NO EDITING');
      this.matDialogRef.close({device: device});
    }

  
  }

  closeDialog() {
    this.matDialogRef.close();
  }


  public error = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };
}
