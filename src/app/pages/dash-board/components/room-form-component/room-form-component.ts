import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SelectOption } from 'src/app/common/interfaces/option.interface';
import { Room } from 'src/app/models/rooms.interface';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { loadMedicalCenter } from 'src/app/store/actions/medicalCenter.actions';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-room-form-component',
  templateUrl: './room-form-component.html',
  styleUrls: ['./room-form-component.scss'],
})
export class RoomFormComponent implements OnInit {
  public registerForm: FormGroup = {} as FormGroup;

  activeUser: any;
  medicalCenterOptions: SelectOption[] = [];
  editing = false;
  dataSource: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public room: any | undefined,
    private matDialogRef: MatDialogRef<RoomFormComponent>,
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
  }

  loadMedicalCenters(userId: number) {
    this.store.dispatch(loadMedicalCenter({ id: userId }));
    this.store
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
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      length: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required]),
      medicalCenter: new FormControl('', [Validators.required]),
    });

    if (this.room) {
      this.editing = true;

      this.registerForm.patchValue({
        name: this.room.roomToEdit.name || '',
        length: this.room.roomToEdit.length || '',
        width: this.room.roomToEdit.width || '',
        height: this.room.roomToEdit.height || '',
        medicalCenter: this.room.roomToEdit.assignedMedicalCenter || '',
      });
    }
  }

  onSubmit() {
    console.log('im submitting');
    if (this.registerForm.invalid) {
      return;
    }

    const room: Room = {
      name: this.registerForm.value.name,
      length: this.registerForm.value.length,
      width: this.registerForm.value.width,
      height: this.registerForm.value.height,
    };

    if (this.editing) {
      this.matDialogRef.close({
        id: this.room?.roomToEdit.id,
        room: room,
        newMedicalCenter: this.registerForm.value.medicalCenter,
      });
    } else {
      DebugerService.log('NO EDITING');
      this.matDialogRef.close({
        id: this.registerForm.value.medicalCenter,
        room: room,
      });
    }
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  error(controlName: string, errorName: string) {
    return this.registerForm.get(controlName)?.hasError(errorName);
  }
}
