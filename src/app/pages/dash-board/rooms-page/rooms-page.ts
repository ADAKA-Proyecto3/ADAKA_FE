import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Room } from 'src/app/models/rooms.interface';
import { addRoom, loadRooms, removeRoom, updateRoom } from 'src/app/store/actions/room.actions';
import { AppState } from 'src/app/store/app.state';
import { RoomFormComponent } from '../components/room-form-component/room-form-component';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { MedicalCenter } from 'src/app/models/medical-center.interface';
import { User } from 'src/app/models/user.interface';

@Component({
  templateUrl: './rooms-page.html',
  styleUrls: ['./rooms-page.scss']
})
export class RoomsPage implements AfterViewInit, OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<AppState>, 
    private dialog: MatDialog) {}

  displayedColumns: string[] = [
    'name',
    'length',
    'width',
    'height',
    'medical center',
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
    /*this.store.select('activeUser').subscribe(({ user, status }) => {
      this.user = user;
        
      });
    }
    this.store.dispatch(loadMedicalCenters({id: user.id}))*/
    this.store.dispatch(loadRooms({id: this.id_centro_medico}));
    /*this.store.select('medicalCenters').subscribe(({medicalCenters, status})){
      this.medicalCenters =  medicalCenters;
    }*/
  }


  ngAfterViewInit(): void {
    this.store.select('rooms').subscribe(({ rooms, status }) => {
    this.dataSource.data = rooms;
      
    });

    this.dataSource.paginator = this.paginator;
  }

  //CRUD
  registerRoom(room: Room) {
    this.store.dispatch(addRoom({ id: 1 , content: room }));
  }

  editRoom(id: number, room: Room) {
    //this.store.dispatch(updateRoom({ id: id, content: room }));
  }

  deleteRoom(room: Room) {
    console.log('borrando room',room)
    const roomId = room.id!;
    this.store.dispatch(removeRoom({ id: roomId }));
  }

  deactivateRoom(room: Room) {
    this.store.dispatch(
      updateRoom({
        id: room.id!,
        content: {
          ...room,
          status: 'INACTIVE',
        },
      })
    );
  }

  // Dialog | Modal Control
  openRoomEditDialog(room: Room): void {
    const dialogRef = this.dialog.open(RoomFormComponent, {
      width: '60%',
      data: room,
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
        this.registerRoom(result.room);
      }
    });
  }
}
