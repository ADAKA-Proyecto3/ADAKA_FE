import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Room } from 'src/app/models/rooms.interface';
import {
  addRoom,
  loadRooms,
  removeRoom,
  updateRoom,
} from 'src/app/store/actions/room.actions';
import { AppState } from 'src/app/store/app.state';
import { RoomFormComponent } from '../components/room-form-component/room-form-component';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { MedicalCenter } from 'src/app/models/medical-center.interface';
import { SelectOption } from 'src/app/common/interfaces/option.interface';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { selectRoomStatus } from 'src/app/store/selectors/room.selector';
import { ActionStatus } from 'src/app/common/enums/action-status.enum';
import { Utils } from 'src/app/common/utils/app-util';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './rooms-page.html',
  styleUrls: ['./rooms-page.scss'],
})
export class RoomsPage implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'id',
    'name',
    'length',
    'width',
    'height',
    'actions',
  ];
  dataSource = new MatTableDataSource<Room>();

  medicalCenters: MedicalCenter[] = [];
  medicalCenterOptions: SelectOption[] = [];

  assignedMedicalCenterOnEdit: number = 0;

  selectedMedicalCenter = new FormControl();

  private statusSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private readonly dialogService: DialogService
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.store
      .select((state) => state.user.activeUser.medicalCenters)
      .subscribe((mc) => {
        if (mc) {
          this.medicalCenters = mc;
          this.medicalCenterOptions = this.medicalCenters.map((mc) => {
            return { value: mc.id!, viewValue: mc.name };
          });
        }
      });
  }

  editRoomDialog(room: Room) {
    this.openRoomEditDialog(room);
  }

  onSelectChange(event: any) {
    const selectedValue = event.value;
    this.assignedMedicalCenterOnEdit = selectedValue;
    this.store.dispatch(loadRooms({ id: selectedValue }));
    this.loadRoomsTable();
  }

  updateMedicalCenterSelectionOnSave(id: number) {
    this.selectedMedicalCenter.setValue(id);
    this.store.dispatch(loadRooms({ id: id }));
    this.loadRoomsTable();
  }

  loadRoomsTable(): void {
    this.store.select('rooms').subscribe(({ rooms }) => {
      this.dataSource.data = rooms;
    });

    this.dataSource.paginator = this.paginator;
  }

  registerRoom(id: number, room: Room) {
    this.store.dispatch(addRoom({ id: id, content: room }));
    this.updateMedicalCenterSelectionOnSave(id);
    this.checkStatusRequest(
      'Sala registrada con éxito',
      'Ha sucedido un error, por favor intente de nuevo'
    );
  }

  editRoom(id: number, room: Room, newMedicalCenterId: number) {
    this.store.dispatch(
      updateRoom({ id: id, medicalCenterId: newMedicalCenterId, content: room })
    );
    //this.store.select('rooms').subscribe(({ rooms }) => {
    // console.log('Datos de salas cargados desde el Store:', rooms);
    //});
    this.updateMedicalCenterSelectionOnSave(newMedicalCenterId);
    this.checkStatusRequest(
      'Sala actualizado con éxito',
      'Ha sucedido un error, por favor intente de nuevo'
    );
  }

  getDeleteUserConfirmation(room: Room) {
    Swal.fire({
      title: `¿Está seguro de eliminar la sala:  ${room.name}?`,
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0096d2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteRoom(room);
      }
    });
  }

  deleteRoom(room: Room) {
    const roomId = room.id!;
    this.store.dispatch(removeRoom({ id: roomId }));
    this.checkStatusRequest(
      'Sala eliminada con éxito',
      'Ha sucedido un error, por favor intente de nuevo'
    );
  }

  openRoomEditDialog(room: Room): void {
    const roomToEdit = {
      ...room,
      assignedMedicalCenter: this.assignedMedicalCenterOnEdit,
    };
    const dialogRef = this.dialog.open(RoomFormComponent, {
      width: '60%',
      data: { roomToEdit },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.id) {
        this.editRoom(result.id, result.room, result.newMedicalCenter);
      }
    });
  }

  openRoomRegisterDialog(): void {
    const dialogRef = this.dialog.open(RoomFormComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      DebugerService.log('ROOM REGISTRATION DIALOG CLOSED');

      if (result && result.room) {
        this.registerRoom(result.id, result.room);
      }
    });
  }

  private checkStatusRequest(successMessage: string, errorMessage: string) {
    this.statusSubscription = this.store
      .pipe(select(selectRoomStatus))
      .subscribe((status) => {
        DebugerService.log('RequestStatus: ' + status);

        if (status === ActionStatus.SUCCESS) {
          this.dialogService.showToast(successMessage);
          this.statusSubscription.unsubscribe();
        } else if (status === ActionStatus.ERROR) {
          Utils.showNotification({
            icon: 'error',
            text: errorMessage,
            showConfirmButton: true,
          });
          this.statusSubscription.unsubscribe();
        }
      });
  }
}
