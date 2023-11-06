import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Room } from 'src/app/models/rooms.interface';
import { addRoom, loadRooms, removeRoom, updateRoom } from 'src/app/store/actions/room.actions';
import { AppState } from 'src/app/store/app.state';
import { RoomFormComponent } from '../components/room-form-component/room-form-component';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { User } from 'src/app/models/user.interface';
import Swal from 'sweetalert2';
import { roomStatusAndError } from 'src/app/store/selectors/room.selector';
import { ActionStatus } from 'src/app/common/enums/action-status.enum';
import { Utils } from 'src/app/common/utils/app-util';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';

@Component({
  templateUrl: './rooms-page.html',
  styleUrls: ['./rooms-page.scss']
})
export class RoomsPage implements AfterViewInit, OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<AppState>, 
    private dialog: MatDialog,
    private readonly dialogService: DialogService
    ) {}
   
  displayedColumns: string[] = [
    'name',
    'length',
    'width',
    'height',
    'actions',
  ];
  dataSource = new MatTableDataSource<Room>();
  medicalCenters = [];
  user : User | undefined;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  id_centro_medico: number = 1;

  ngOnInit(): void {
    this.store.dispatch(loadRooms({id: this.id_centro_medico}));
  }

  ngAfterViewInit(): void {
    this.store.select('rooms').subscribe(({ rooms }) => {
    this.dataSource.data = rooms; 
    });

    this.dataSource.paginator = this.paginator;
  }

  //CRUD
  registerRoom(id: number, room: Room) {
    this.store.dispatch(addRoom({ id: id , content: room }));
  }

  editRoom(id: number, room: Room) {
    this.store.dispatch(updateRoom({ id: id, content: room }));
  }


  deleteRoom(room: Room) {
    console.log('borrando room',room)
    const roomId = room.id!;
    this.store.dispatch(removeRoom({ id: roomId }));
    this.checkStatusRequest("Eliminado correctamente")
  }

  deactivateRoom(room: Room) {
    this.store.dispatch(
      updateRoom({
        id: room.id!,
        content: {
          ...room,
        },
      })
    );
  }

  // Dialog | Modal Control
  openRoomEditDialog(room: Room): void {
    const dialogRef = this.dialog.open(RoomFormComponent, {
      width: '60%',
      data: room,
      //opciones: this.medicalCenters,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.id) {
        this.editRoom(result.id, result.room);
      }
    });
  }

  openRoomRegisterDialog(): void {
    const dialogRef = this.dialog.open(RoomFormComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      DebugerService.log('ROOM REGISTRATION DIALOG CLOSED');
      console.log(result);
      if (result && result.room) {
        console.log(result)
        this.registerRoom(result.id, result.room);
      }
    });
  }

  getDeleteRoomConfirmation(room: Room) {
    console.log("entro aqui a eliminar")
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

  private checkStatusRequest(successMessage: string) {
    this.store.pipe(select(roomStatusAndError)).subscribe((data) => {
      DebugerService.log('RequestStatus: ' + data.status);
      console.log(data.error)
      if (data.status === ActionStatus.SUCCESS) {
        this.dialogService.showToast(successMessage);
      } else if (data.status === ActionStatus.ERROR) {
        Utils.showNotification({
          icon: 'error',
          text: data.error.error.title,
          showConfirmButton: true,
        });
      }
    });
  }
}
