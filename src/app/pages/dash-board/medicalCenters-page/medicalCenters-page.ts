import {  Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  updateMedicalCenterState,
} from '../../../store/actions/medicalCenter.actions';
import {
  publicOptions,
  statusOptions,
} from 'src/app/common/selectOptions/selectOptions';
import { MedicalCenterFormComponent } from '../components/medicalCenter-form-component/medicalCenter-form-component';
import { DebugerService } from '../../../services/debug-service/debug.service';
import { medicalCenterStatusAndError } from 'src/app/store/selectors/medicalCenter.selector';
import { ActionStatus } from 'src/app/common/enums/action-status.enum';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { Utils } from 'src/app/common/utils/app-util';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription, filter, take } from 'rxjs';
import Swal from 'sweetalert2';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { PlanValidatorService } from 'src/app/auth/services/plan.service';


@Component({
  selector: 'app-medicalCenter-page',
  templateUrl: './medicalCenters-page.html',
  styleUrls: ['./medicalCenters-page.scss'],
})
export class MedicalCentersPage implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private readonly dialogService: DialogService,
    private readonly pageRouter: PageRouterService
  ) {}

  displayedColumns: string[] = [
    'name',
    'email',
    'direction',
    'latitude',
    'longitude',
    'status',
    'showPublic',
    'actions',
  ];
  planValidator = new PlanValidatorService();
  planName: string ="";
  dataSource = new MatTableDataSource<MedicalCenter>();
  idAdmin: any = 0;
  private statusSubscription: Subscription = new Subscription();
  private activeUserSuscription: Subscription = new Subscription();
  private medicalCenterSuscription: Subscription = new Subscription();
  activeUser: any;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.activeUserSuscription = this.store
      .select((state) => state.user.activeUser)
      .subscribe((user) => {
        if(user.subscription){
          this.planName=user.subscription.planName;
        }
        this.activeUser = user;
        this.idAdmin = user.id;
        this.store.dispatch(loadMedicalCenter({ id: this.idAdmin }));
        this.loadMedicalCenterTable();
      });
  }

  ngOnDestroy(): void {
    this.activeUserSuscription.unsubscribe();
    this.medicalCenterSuscription.unsubscribe();
  }

  loadMedicalCenterTable(): void {
    this.medicalCenterSuscription = this.store
      .select('medicalCenters')
      .subscribe(({ medicalCenters }) => {
        this.dataSource.data = medicalCenters;
      });
    this.dataSource.paginator = this.paginator;
  }

  registerMedicalCenter(id: number, medicalCenter: MedicalCenter) {
    
    if(this.planValidator.validarMedicalCenter(this.dataSource.data, this.planName)){
     
      const fechaActual = new Date();

      const formatoFecha = `${fechaActual.getDate()}/${
        fechaActual.getMonth() + 1
      }/${fechaActual.getFullYear()}`;
  
      if (medicalCenter.showPublic == 1) {
        Swal.fire({
          title: 'Términos y Condiciones',
          html: `
              <p>Estimado/a ${this.activeUser.name} ,</p>
              <p>Para mejorar la transparencia y contribuir al avance de la atención médica, solicitamos su consentimiento para la publicación pública de sus datos de mediciones en la aplicación de ZhenAir.</p>
              <p><strong>¿Consiente la publicación pública de sus datos de mediciones en la aplicación?</strong></p>
                <br>
              <p>Entendemos la sensibilidad de esta información y garantizamos su privacidad al máximo.</p>
              <p>Fecha: ${formatoFecha}</p>
              <p>Gracias por contribuir a la mejora continua de nuestros servicios y a la comunidad médica en general.</p>
              <p>Atentamente,</p>
              <p>ADAKA<br/>ZhenAir</p>
          `,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: 'Aceptar',
          confirmButtonAriaLabel: 'Aceptar',
          cancelButtonText: 'No aceptar',
          cancelButtonAriaLabel: 'No aceptar',
          customClass: {
            closeButton: 'modal-close-button',
            confirmButton: 'modal-confirm-button',
            cancelButton: 'modal-cancel-button',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            this.store.dispatch(
              addMedicalCenter({ id: id, content: medicalCenter })
            );
          } else if (!result.isConfirmed) {
            medicalCenter.showPublic = 2;
            this.store.dispatch(
              addMedicalCenter({ id: id, content: medicalCenter })
            );
          }
          this.checkStatusRequest('Centro médico registrado con éxito');
        });
      }else{
        this.store.dispatch(
          addMedicalCenter({ id: id, content: medicalCenter })
        );
        this.checkStatusRequest('Centro médico registrado con éxito');
      }


    }else{

      Utils.showNotification({
        icon: 'error',
        text: "Número máximo de centros médico registrados para su plan",
        showConfirmButton: true,
      });

    }

   
  }

  editMedicalCenter(id: number, medicalCenter: MedicalCenter) {
    this.store.dispatch(
      updateMedicalCenter({ id: id, content: medicalCenter })
    );
    this.checkStatusRequest('Centro médico actualizado con éxito');
  }

  deleteMedicalCenter(medicalCenter: MedicalCenter) {
    const medicalId = medicalCenter.id!;
    this.store.dispatch(removeMedicalCenter({ id: medicalId }));

    this.checkStatusRequest('Eliminado correctamente');
  }

  deactivateMedicalCenter(medicalCenter: MedicalCenter) {
   
    if(medicalCenter.status === 'INACTIVE') {
    this.dialogService.showToast('El centro médico ya se encuentra desactivado');
    return 
    }

    this.store.dispatch(
      updateMedicalCenterState({
        id: medicalCenter.id!,
        state: 'INACTIVE',
      })
    );
    this.checkStatusRequest('Centro médico desactivado correctamente');
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
    this.statusSubscription = this.store
      .pipe(select(medicalCenterStatusAndError))
      .subscribe((data) => {
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

  returnStatusViewValue(status: string) {
    const viewValue = statusOptions.find(
      (option) => option.value === status
    )?.viewValue;
    return viewValue;
  }

  returnShowPublicViewValue(show: number) {
    const viewValue = publicOptions.find(
      (option) => option.value === show
    )?.viewValue;
    return viewValue;
  }

  goToMain() {
    this.pageRouter.route(`${UrlPages.DASHBOARD}/${UrlPages.MAIN}`);
  }
}
