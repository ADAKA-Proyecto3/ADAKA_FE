import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select, on } from '@ngrx/store';
import { Device } from 'src/app/models/devices.interface';
import { AppState } from 'src/app/store/app.state';
import { DeviceFormComponent } from '../components/device-form-component/device-form-component';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { addDevice, loadDevices, removeDevice } from 'src/app/store/actions/device.actions';
import { Subscription } from 'rxjs';
import { selectDeviceStatus } from 'src/app/store/selectors/device.selector';
import { ActionStatus } from 'src/app/common/enums/action-status.enum';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { Utils } from 'src/app/common/utils/app-util';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import { Suscription } from 'src/app/models/suscription.interface';

@Component({
  selector: 'app-devices-page',
  templateUrl: './devices-page.html',
})

export class DevicesPage  implements AfterViewInit, OnInit, OnDestroy{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private statusSubscription: Subscription = new Subscription();
  activeUser: any;
  idAdmin: any = 0;

  private activeUserSuscription: Subscription = new Subscription();
  constructor(
    private store: Store<AppState>, 
    private dialog: MatDialog,
    private readonly dialogService: DialogService,
    private readonly pageRouterService: PageRouterService,
    ) {}

    
  //devices$: Observable<Device[]> | undefined;

  displayedColumns: string[] = [
    
    'deviceId',
    'model',
    'installationDate',
    'actions',
  ];

  dataSource = new MatTableDataSource<Device>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.activeUserSuscription = this.store
    .select((state) => state.user.activeUser.id)
    .subscribe((id) => {
      this.activeUser = id;
      this.store.dispatch(loadDevices({ adminId: this.activeUser }));
    });
  this.loadDevicesTable();
  }

  ngOnDestroy(): void {
    this.activeUserSuscription.unsubscribe();
  }

  loadDevicesTable(): void {
    this.store.select('devices').subscribe(({ devices }) => {
      this.dataSource.data = devices;
    });
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.store.select('devices').subscribe(({ devices  }) => {
      this.dataSource.data = devices;
      this.dataSource.paginator = this.paginator;
    });
  }

  //CRUD
  registerDevice(userId: number, device: Device) {
    this.store.dispatch(
      addDevice({
        adminId: userId,
        content: device,
      })
    );
    this.checkStatusRequest(
      'Dispositivo registrado con éxito',
      'Ha sucedido un error, por favor intente de nuevo'
    );
    }

  getDeleteDeviceConfirmation(device: Device) {
    Swal.fire({
      title: `¿Está seguro de eliminar el dispositivo: ${device.deviceId} ?`,
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


  deleteDevice(device: Device) {
    if (device.id !== undefined) {
      console.log("DEVICE ID: ", device.id);
      this.store.dispatch(removeDevice({deviceId: device.id}));
      this.checkStatusRequest(
        'Dispositivo eliminado con éxito',
        'Ha sucedido un error, por favor intente de nuevo'
      );
    }
  }


  openDeviceRegisterDialog(): void {
    const dialogRef = this.dialog.open(DeviceFormComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      DebugerService.log('DEVICE REGISTRATION DIALOG CLOSED');
    
      if (result && result.device) {
        this.registerDevice(result.adminId, result.device);
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
    this.pageRouterService.route(`${UrlPages.DASHBOARD}/${UrlPages.MAIN}`)
      }
}
