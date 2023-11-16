import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MedicalCenter } from '../../../models/medical-center.interface';
import {
  addMedicalCenter,
  loadMedicalCenter,
  removeMedicalCenter,
  updateMedicalCenter,
} from '../../../store/actions/medicalCenter.actions';
import { MedicalCenterFormComponent } from '../components/medicalCenter-form-component/medicalCenter-form-component';
import { DebugerService } from '../../../services/debug-service/debug.service';
import {
  medicalCenterStatusAndError,
} from 'src/app/store/selectors/medicalCenter.selector';
import { ActionStatus } from 'src/app/common/enums/action-status.enum';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { Utils } from 'src/app/common/utils/app-util';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription, filter, take } from 'rxjs';
import Swal from 'sweetalert2';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';

@Component({
  selector: 'app-medicalCenter-page',
  templateUrl: './medicalCenters-page.html',
  styleUrls: ['./medicalCenters-page.scss'],
})
export class MedicalCentersPage implements  OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private readonly dialogService: DialogService,
    private readonly auth: AuthService,
    private readonly pageRouter: PageRouterService
  
  ) {}

  displayedColumns: string[] = [
    'name',
    'email',
    'status',
    'direction',
    'latitude',
    'longitude',
    'actions',
  ];
  dataSource = new MatTableDataSource<MedicalCenter>();
  idAdmin: any = 0;
  private statusSubscription: Subscription = new Subscription();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    if (this.idAdmin === 0) {
      this.auth.checkSignedInUser();
    }
    this.loadUser();
    this.loadMedicalCenterTable()
  }

  loadMedicalCenterTable(): void {
    this.store.select('medicalCenters').subscribe(({ medicalCenters }) => {
   
      this.dataSource.data = medicalCenters;
    });
    this.dataSource.paginator = this.paginator;
  }

  //CRUD
  registerMedicalCenter(id: number, medicalCenter: MedicalCenter) {

    this.store.dispatch(addMedicalCenter({ id: id, content: medicalCenter }));
    this.checkStatusRequest("Centro médico registrado con éxito");
  }

  editMedicalCenter(id: number, medicalCenter: MedicalCenter) {
    this.store.dispatch(
      updateMedicalCenter({ id: id, content: medicalCenter })
    );
  }

  deleteMedicalCenter(medicalCenter: MedicalCenter) {
  
    const medicalId = medicalCenter.id!;
    this.store.dispatch(removeMedicalCenter({ id: medicalId }));

    this.checkStatusRequest('Eliminado correctamente');
  }

  deactivateMedicalCenter(medicalCenter: MedicalCenter) {
    this.store.dispatch(
      updateMedicalCenter({
        id: medicalCenter.id!,
        content: {
          ...medicalCenter,
          status: 'INACTIVE',
        },
      })
    );
  }

  // Dialog | Modal Control
  openMedicalCenterEditDialog(medicalCenter: MedicalCenter): void {
    const dialogRef = this.dialog.open(MedicalCenterFormComponent, {
      width: '60%',
      data: medicalCenter,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.id) {
        this.editMedicalCenter(result.id, result.medicalCenter);
      }
    });
  }

  openMedicalCenterRegisterDialog(): void {
    const dialogRef = this.dialog.open(MedicalCenterFormComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      DebugerService.log('MEDICAL CENTER REGISTRATION DIALOG CLOSED');
      
      if (result && result.medicalCenter) {
        this.registerMedicalCenter(this.idAdmin, result.medicalCenter);
      }
    });
  }

  getDeleteMedicalCenterConfirmation(medicalCenter: MedicalCenter) {
   
    Swal.fire({
      title: `¿Está seguro de eliminar el centro medico:  ${medicalCenter.name}?`,
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0096d2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteMedicalCenter(medicalCenter);
      }
    });
  }


  private checkStatusRequest(successMessage: string) {
    this.statusSubscription = this.store.pipe(select(medicalCenterStatusAndError)).subscribe((data) => {
      DebugerService.log('RequestStatus: ' + data.status);
    
      if (data.status === ActionStatus.SUCCESS) {
        this.dialogService.showToast(successMessage);
        this.statusSubscription.unsubscribe(); 
      } else if (data.status === ActionStatus.ERROR) {
        Utils.showNotification({
          icon: 'error',
          text: data.error.error.title,
          showConfirmButton: true,
        });
        this.statusSubscription.unsubscribe(); 
      }
    });
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
        this.store.dispatch(loadMedicalCenter({ id: this.idAdmin }));

      });
  }

  goToMain(){
    this.pageRouter.route(`${UrlPages.DASHBOARD}/${UrlPages.MAIN}`)
      }

  
}
