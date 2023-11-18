import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Device } from 'src/app/models/devices.interface';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { AppState } from 'src/app/store/app.state';
import { loadRooms } from '../../../../store/actions/room.actions' 
import { SelectOption } from 'src/app/common/interfaces/option.interface';

@Component({
  selector: 'app-device-form-component',
  templateUrl: './device-form-component.html',
  styleUrls: ['./device-form-component.scss'],
})
export class DeviceFormComponent implements OnInit {
  public registerForm: FormGroup = {} as FormGroup;

  selectedValue: string = '';

  editing = false;

  activeUser: any;
  roomOptions: SelectOption[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public device: Device | undefined,
    private matDialogRef: MatDialogRef<DeviceFormComponent>,
    private readonly store: Store<AppState>
    ) {
    matDialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.store
    .select((state) => state.user.activeUser.id)
    .subscribe((id) => {
      this.activeUser = id;
     // this.loadRooms(this.activeUser);
    });


  this.registerForm = new FormGroup({
    deviceId: new FormControl('', [Validators.required]),
    model: new FormControl('', [ Validators.required, Validators.maxLength(30), ]),
    date: new FormControl('', [Validators.required]),
    //room: new FormControl('', [Validators.required]),
  });

  if (this.device) {
    this.editing = true;
    this.registerForm.patchValue({
      deviceId: this.device.deviceId || '',
      model: this.device.model || '',
      date: this.device.installation || '',
     // room: this.device.assignedRoomId || '',
     });
  }
  }

  get deviceId() {
    return this.registerForm.get('deviceId');
  }
  get model() {
    return this.registerForm.get('model');
  }
  get date() {
    return this.registerForm.get('date');
  }
  get room() {
    return this.registerForm.get('room');
  }
  

  // loadRooms(userId: number) {
  //   this.store.dispatch(loadRooms({id: userId}));
  //   this.store
  //   .select((state) => state.rooms.rooms)
  //   .subscribe((rooms) => {
  //     this.roomOptions = rooms.map((room) => {
  //       return { value: room.id!, viewValue: room.name };
  //     });
  //   });
  // }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
  
    const device: Device = {
      deviceId: this.registerForm.value.deviceId,
      model: this.registerForm.value.model,
      installation: this.registerForm.value.date,  // Asegúrate de que esta propiedad coincida con el nombre "installation" en tu objeto JSON // Asigna el ID del usuario activo
     // assignedRoomId: this.registerForm.value.room, 
    };
  
    console.log('Device:', device);

    DebugerService.log('NO EDITING');
    this.matDialogRef.close({adminId: this.activeUser, device: device});
 
  
    // if (this.editing) {
    //   device.assignedRoomId = this.registerForm.value.room;
    //   this.matDialogRef.close({ deviceId: this.device?.deviceId, device: device });
    // } else {
    //   DebugerService.log('NO EDITING');
    //   this.matDialogRef.close({userId: this.activeUser, device: device, roomId: device.assignedRoomId});
    // }
  }

  closeDialog() {
    this.matDialogRef.close();
  }


  public error = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };
}
