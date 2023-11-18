import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Room } from 'src/app/models/rooms.interface';
import {
  addRoom,
  loadRooms,
  removeDeviceRoom,
  removeRoom,
  updateAddRoomDevice,
  updateRoom,
} from 'src/app/store/actions/room.actions';
import { AppState } from 'src/app/store/app.state';
import { RoomFormComponent } from '../components/room-form-component/room-form-component';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { MedicalCenter } from 'src/app/models/medical-center.interface';
import { SelectOption } from 'src/app/common/interfaces/option.interface';
import { Subscription} from 'rxjs';
import { selectRoomStatus } from 'src/app/store/selectors/room.selector';
import { ActionStatus } from 'src/app/common/enums/action-status.enum';
import { Utils } from 'src/app/common/utils/app-util';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import Swal from 'sweetalert2';
import { RoomStatsVisualComponent } from '../components/room-stats-visual-component/room-stats-visual-component';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { Device } from 'src/app/models/devices.interface';
import { loadDevices } from 'src/app/store/actions/device.actions';
import { AssignRoomDeviceFormComponent } from '../components/assign-room-device-component/assign-room-device-component';

@Component({
  templateUrl: './rooms-page.html',
  styleUrls: ['./rooms-page.scss'],
})
export class RoomsPage implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [];

  medicalCenters: MedicalCenter[] = [];
  medicalCenterOptions: SelectOption[] = [];
  dataSource = new MatTableDataSource<Room>();
  isAdmin: boolean = true;
  assignedMedical: number = 0;
  devices: Device[] = [];
  devicesOptions: SelectOption[] = [];
  requestDeviceId: number = 0;

  private statusSubscription: Subscription = new Subscription();
  private activeUserSuscription: Subscription = new Subscription();
  private roomsSuscription: Subscription = new Subscription();
  activeUser: any;
  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private readonly dialogService: DialogService,
    private readonly pageRouter: PageRouterService
  ) {}

  ngOnDestroy(): void {
    this.activeUserSuscription.unsubscribe();
    this.roomsSuscription.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
   this.activeUserSuscription = this.store
      .select((state) => state.user.activeUser)
      .subscribe((user) => {

        if(user.id !== 0){
          const login = JSON.parse(sessionStorage.getItem('login') || '{}');
          this.isAdmin = login ? login.isAdmin : false;
          this.activeUser = user;
          this.preLoadRooms();
        }
       
      });
      
  }

  preLoadRooms() {
    if(this.isAdmin){
      this.displayedColumns = [ 'id', 'name','medicalCenter', 'zhenair', 'device', 'actions' ];
      this.store.dispatch(loadDevices({ adminId: this.activeUser.id }));
    }else{
      this.displayedColumns = [ 'id', 'name', 'medicalCenter', 'zhenair', 'device' ];
      this.store.dispatch(loadDevices({ adminId: this.activeUser.manager }));
    }
    this.medicalCenters = this.activeUser.medicalCenters;
      

    this.store.dispatch(loadRooms({ id: this.activeUser.id }));
    this.loadRoomsTable();
  }

  loadRoomsTable(): void {
    this.roomsSuscription = this.store.select('rooms').subscribe(({ rooms }) => {
      this.dataSource.data = rooms;
      this.dataSource.paginator = this.paginator;
    });
   
  }

  editRoomDialog(room: Room) {
    this.openRoomEditDialog(room);
  }


  assignDevice(roomId:number, deviceId:number){
    this.store.dispatch(updateAddRoomDevice({roomId:roomId, deviceId:deviceId}));
    this.checkStatusRequest(
      'Dispositivo asignado con éxito',
      'Ha sucedido un error, por favor intente de nuevo'
    );

  }

  registerRoom(id: number, room: Room) {
    this.store.dispatch(addRoom({ id: id, content: room }));
    this.checkStatusRequest(
      'Sala registrada con éxito',
      'Ha sucedido un error, por favor intente de nuevo'
    );
  }

  editRoom(id: number, room: Room, newMedicalCenterId: number) {
    this.store.dispatch( updateRoom({ id: id, medicalCenterId: newMedicalCenterId, content: room })    );
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

  removeDeviceFromRoom(roomId: number) {
    this.store.dispatch(removeDeviceRoom({roomId:roomId}));
    this.checkStatusRequest(
      'Dispositivo desvinculado con éxito',
      'Ha sucedido un error, por favor intente de nuevo'
    );
  }

  openAssignDeviceEditDialog(room: Room): void {
    const dialogRef = this.dialog.open(AssignRoomDeviceFormComponent, {
      width: '50%',
      data: room,
    });

    dialogRef.afterClosed().subscribe(async (result) => {

      if(result && result.unlinking){
        this.removeDeviceFromRoom(result.roomId);
      }else if (result && !result.unlinking) {
        this.assignDevice(result.roomId, result.deviceId);
      }
    });
  }


  openRoomEditDialog(room: Room): void {
    const dialogRef = this.dialog.open(RoomFormComponent, {
      width: '60%',
      data: room,
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

  showRoomStats(room: Room): void {
    const dialogRef = this.dialog.open(RoomStatsVisualComponent, {
      width: '80%',
      data: room,
    });
  }

  hasDevices(room: Room): boolean {
    if (room && room.device?.deviceId) {
      return true;
    }
    return false;
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

  returnMedicalCenterViewValue(medicalCenterId: number) {
    const viewValue = this.medicalCenters.find(
      (mc) => mc.id === medicalCenterId
    )?.name;
    return viewValue;
  }

  goToMain() {
    this.pageRouter.route(`${UrlPages.DASHBOARD}/${UrlPages.MAIN}`);
  }

  showRegisterButton(): boolean {
    return this.isAdmin;
  }
}
