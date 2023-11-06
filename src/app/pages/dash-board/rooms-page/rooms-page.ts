import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
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
import { User } from 'src/app/models/user.interface';
import { SelectOption } from 'src/app/common/interfaces/option.interface';

@Component({
  templateUrl: './rooms-page.html',
  styleUrls: ['./rooms-page.scss'],
})
export class RoomsPage implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  displayedColumns: string[] = ['name', 'length', 'width', 'height', 'actions'];
  dataSource = new MatTableDataSource<Room>();
  medicalCenters: MedicalCenter[] = [];
  medicalCenterOptions: SelectOption[] = [];
  medicalCenterSelected: boolean = false;
  assignedMedicalCenterOnEdit: number = 0;

  user: User | undefined;
  //medicalCenters: any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  id_centro_medico: number = 1;

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

  loadRoomsTable(): void {
    this.store.select('rooms').subscribe(({ rooms }) => {
      this.dataSource.data = rooms;

      if (rooms.length < 1) {
        this.medicalCenterSelected = true;
      }
    });

    this.dataSource.paginator = this.paginator;
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

  //CRUD
  registerRoom(id: number, room: Room) {
    this.store.dispatch(addRoom({ id: id, content: room }));
  }

  editRoom(id: number, room: Room) {
    this.store.dispatch(updateRoom({ id: id, content: room }));
  }

  deleteRoom(room: Room) {
    console.log('borrando room', room);

    const roomId = room.id!;
    this.store.dispatch(removeRoom({ id: roomId }));
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


  openRoomEditDialog(room: Room): void {
    
    const roomToEdit ={
      ...room,
      assignedMedicalCenter: this.assignedMedicalCenterOnEdit,
    }
    const dialogRef = this.dialog.open(RoomFormComponent, {
      width: '60%',
      data: { roomToEdit },
    
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
        console.log(result);
        this.registerRoom(result.id, result.room);
      }
    });
  }
}
