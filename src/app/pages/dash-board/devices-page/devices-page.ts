import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Device } from 'src/app/models/devices.interface';
import { loadRooms, removeRoom, updateRoom } from 'src/app/store/actions/room.actions';
import { AppState } from 'src/app/store/app.state';
import { DeviceFormComponent } from '../components/device-form-component/device-form-component';
import { DebugerService } from 'src/app/services/debug-service/debug.service';

@Component({
  selector: 'app-devices-page',
  templateUrl: './devices-page.html',
})

export class DevicesPage  implements AfterViewInit, OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<AppState>, 
    private dialog: MatDialog) {}

  displayedColumns: string[] = [
    'id',
    'model',
    'room',
    'installationDate',
    'actions',
  ];

  dataSource = new MatTableDataSource<Device>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    //this.store.dispatch(loadRooms());
    
  }

  ngAfterViewInit(): void {
    //this.store.select('rooms').subscribe(({ rooms, status }) => {
     // this.dataSource.data = rooms;
      
    //});

    this.dataSource.paginator = this.paginator;
  }

  //CRUD
  registerDevice(device: Device) {
    //this.store.dispatch(addRoom({ content: room }));
  }

  editDevice(id: number, device: Device) {
    //this.store.dispatch(updateRoom({ id: id, content: room }));
  }

  deleteDevice(room: Device) {
    const roomId = room.id!;
   // this.store.dispatch(removeRoom({ id: roomId }));
  }

  deactivateDevice(device: Device) {
  /*   this.store.dispatch(
     updateRoom({
        id: device.id!,
      }
    );*/
  }

  // Dialog | Modal Control
  openDeviceEditDialog(device: Device): void {
    const dialogRef = this.dialog.open(DeviceFormComponent, {
      width: '60%',
      data: device,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.id) {
        this.editDevice(result.id, result.room);
      }
    });
  }

  openRoomRegisterDialog(): void {
    const dialogRef = this.dialog.open(DeviceFormComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      DebugerService.log('DEVICE REGISTRATION DIALOG CLOSED');
      console.log(result);
      if (result && result.device) {
        this.registerDevice(result.device);
      }
    });
  }
}
