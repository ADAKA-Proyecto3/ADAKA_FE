import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Device } from 'src/app/models/devices.interface';
import { AppState } from 'src/app/store/app.state';
import { DeviceFormComponent } from '../components/device-form-component/device-form-component';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { addDevice, loadDevices, removeDevice, updateDevice } from 'src/app/store/actions/device.actions';
import { Subscription, filter, map, take } from 'rxjs';
import { selectDeviceStatus } from 'src/app/store/selectors/device.selector';
import { ActionStatus } from 'src/app/common/enums/action-status.enum';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { Utils } from 'src/app/common/utils/app-util';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';

@Component({
  selector: 'app-devices-page',
  templateUrl: './devices-page.html',
})

export class DevicesPage  implements AfterViewInit, OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private statusSubscription: Subscription = new Subscription();
  activeUser: any;
  idAdmin: any = 0;
  aut: any;
  pageRouter: any;
  constructor(
    private store: Store<AppState>, 
    private dialog: MatDialog,
    private readonly dialogService: DialogService) {}

    
  devices$: Observable<Device[]> | undefined;

  displayedColumns: string[] = [
    'id',
    'model',
    'room',
    'date',
    'actions',
  ];

  dataSource = new MatTableDataSource<Device>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    if (this.idAdmin === 0) {
      this.aut.checkSignedInUser();
    }
    this.loadUser();
  }

  private loadUser() {
    this.store
      .select('user')
      .pipe(
        filter(
          (activeUser) =>
          activeUser.status === "success"
        ),
        take(1)
      )
      .subscribe((activeUser) => {
        this.idAdmin = activeUser.activeUser.id;
        this.store.dispatch(loadDevices({ userId: this.idAdmin }));

      });
  }


  ngAfterViewInit(): void {
    this.store.select('devices').subscribe(({ devices  }) => {
      this.dataSource.data = devices;
      this.dataSource.paginator = this.paginator;
    });
  }

  //CRUD
  registerDevice(userId: number, device: Device, roomId: number) {
    this.store.dispatch(
      addDevice({
        userId: userId,
        content: device,
        roomId: roomId,
      })
    );
    this.checkStatusRequest(
      'Dispositivo registrado con éxito',
      'Ha sucedido un error, por favor intente de nuevo'
    );
    }


  editDevice(deviceId: number, device: Device) {
    this.store.dispatch(updateDevice({ id: deviceId, content: device }));
    this.checkStatusRequest(
      'Dispostivo actualizado con éxito',
      'Ha sucedido un error, por favor intente de nuevo'
    );
  }


  getDeleteDeviceConfirmation(device: Device) {
    Swal.fire({
      title: `¿Está seguro de eliminar el dispositivo:  ${device.deviceId} ${device.model}, de la sala: ${device.assignedRoomId}?`,
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0096d2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteDevice(device);
      }
    });
  }

  formatDate(date: Date): string {
    return date ? date.toISOString() : '';
  }

  deleteDevice(device: Device) {
    const deviceId = device.deviceId!;
    this.store.dispatch(removeDevice({id: deviceId}));
    this.checkStatusRequest(
      'Dispositivo eliminado con éxito',
      'Ha sucedido un error, por favor intente de nuevo'
    );
  }

  // Dialog | Modal Control
  openDeviceEditDialog(device: Device): void {
    const dialogRef = this.dialog.open(DeviceFormComponent, {
      width: '60%',
      data: device,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.id) {
        this.editDevice(result.id, result.device);
      }
    });
  }

  openDeviceRegisterDialog(): void {
    const dialogRef = this.dialog.open(DeviceFormComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      DebugerService.log('DEVICE REGISTRATION DIALOG CLOSED');
    
      if (result && result.device) {
        this.registerDevice(result.userId, result.device, result.roomId);
        console.log("RESULT.DEVICE: ", result.device);
      }
    });
  }
  

  private checkStatusRequest(successMessage: string, errorMessage: string) {
    this.statusSubscription =  this.store.pipe(select(selectDeviceStatus)).subscribe((status) => {
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

  goToMain(){
    this.pageRouter.route(`${UrlPages.DASHBOARD}/${UrlPages.MAIN}`)
      }
}
