import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SelectOption } from 'src/app/common/interfaces/option.interface';
import { Room } from 'src/app/models/rooms.interface';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { loadMedicalCenter } from 'src/app/store/actions/medicalCenter.actions';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-assign-room-form',
  templateUrl: './assign-room-device-component.html',
  styleUrls: ['./assign-room-device-component.scss'],
})
export class AssignRoomDeviceFormComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup = {} as FormGroup;

  activeUser: any;
  medicalCenterOptions: SelectOption[] = [];
  deviceOptions: SelectOption[] = [];
  editing = false;
  dataSource: any;

  private activeUserSuscription: Subscription = new Subscription();
  private devicesSuscription: Subscription = new Subscription();
  private medicalCenterSuscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public room: Room | undefined,
    private matDialogRef: MatDialogRef<AssignRoomDeviceFormComponent>,
    private readonly store: Store<AppState>
  ) {
    matDialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.activeUserSuscription = this.store
      .select((state) => state.user.activeUser.id)
      .subscribe((id) => {
        this.activeUser = id;
        this.loadMedicalCenters(this.activeUser);
      });

    this.devicesSuscription = this.store
      .select((state) => state.devices.devices)
      .subscribe((devices) => {
        this.deviceOptions = devices.map((d) => {
          return { value: d.id!, viewValue: d.deviceId.toString() };
        });
      });
  }

  ngOnDestroy(): void {
    this.activeUserSuscription.unsubscribe();
    this.devicesSuscription.unsubscribe();
    this.medicalCenterSuscription.unsubscribe();
  }

  loadMedicalCenters(userId: number) {
    this.store.dispatch(loadMedicalCenter({ id: userId }));

    this.medicalCenterSuscription = this.store
      .select((state) => state.medicalCenters.medicalCenters)
      .subscribe((medicalCenters) => {
        this.medicalCenterOptions = medicalCenters.map((mc) => {
          return { value: mc.id!, viewValue: mc.name };
        });
      });

    this.initializeProperties();
  }

  initializeProperties() {
    this.registerForm = new FormGroup({
      device: new FormControl(''),
    });

    if (this.room) {
      this.editing = true;
      this.registerForm.patchValue({
        device: this.room.device?.id || '',
      });
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.matDialogRef.close({
      roomId: this.room?.id,
      deviceId: this.registerForm.value.device,
      unlinking: false,
    });

  }

  unlinkDevice() {
    const existingRoom = this.room as Room;
    const { device, ...roomWithOutDevice } = existingRoom;
    // existingRoom.device = null;
    // this.matDialogRef.close({
    //   room: existingRoom,
    //   unlinking: true,
    //});

    // Rest of the code...
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  error(controlName: string, errorName: string) {
    return this.registerForm.get(controlName)?.hasError(errorName);
  }
}
