import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { User } from 'src/app/models/user.interface';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  addSubUser,
  loadUsers,
  removeUser,
  updateUser,
} from 'src/app/store/actions/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../components/user-form-component/user-form-component';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { selectUserStatus } from 'src/app/store/selectors/user.selector';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { Utils } from 'src/app/common/utils/app-util';
import Swal from 'sweetalert2';
import { ActionStatus } from 'src/app/common/enums/action-status.enum';
import { Subscription } from 'rxjs';
import {
  roleOptions,
  statusOptions,
} from 'src/app/common/selectOptions/selectOptions';
import { loadMedicalCenter } from 'src/app/store/actions/medicalCenter.actions';
import { MedicalCenter } from 'src/app/models/medical-center.interface';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { PlanValidatorService } from 'src/app/auth/services/plan.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.html',
  styleUrls: ['./users-page.scss'],
})
export class UsersPage implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private readonly dialogService: DialogService,
    private readonly pageRouter: PageRouterService,
  ) {}
  planValidator = new PlanValidatorService();
  planName:string="";
  result: string = '';
  activeUser: any;
  medicalCenters: MedicalCenter[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'role',
    'phone',
    'email',
    'medicalCenter',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<User>();
  private statusSubscription: Subscription = new Subscription();
  private activeUserSuscription: Subscription = new Subscription();
  private medicalCenterSuscription: Subscription = new Subscription();
  private usersSuscription: Subscription = new Subscription();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.activeUserSuscription = this.store
      .select((state) => state.user.activeUser)
      .subscribe((user) => {
        if(user.subscription){
          this.planName = user.subscription.planName;
        }
        this.activeUser = user.id;
        this.store.dispatch(loadUsers({ id: this.activeUser }));
        this.store.dispatch(loadMedicalCenter({ id: this.activeUser }));
      });
    this.loadUsersTable();
  }

  ngOnDestroy(): void {
    this.activeUserSuscription.unsubscribe();
    this.medicalCenterSuscription.unsubscribe();
    this.usersSuscription.unsubscribe();
  }

  loadUsersTable(): void {
    this.medicalCenterSuscription = this.store
      .select('medicalCenters')
      .subscribe(({ medicalCenters }) => {
        this.medicalCenters = medicalCenters;
      });

    this.usersSuscription = this.store
      .select('users')
      .subscribe(({ users, status }) => {
        this.dataSource.data = users;
      });

    this.dataSource.paginator = this.paginator;
  }

  //CRUD
  registerUser(user: User, parentId: number, medicalCenterId: number) {
    if(this.planValidator.validarUsers(this.dataSource.data, this.planName)){
      this.store.dispatch(
      addSubUser({
        content: user,
        parentId: parentId,
        medicalCenterId: medicalCenterId,
      })
    );
    this.checkStatusRequest(
      'Usuario registrado con éxito',
      'Ha sucedido un error, por favor intente de nuevo'
    );
    }else{
      Utils.showNotification({
        icon: 'error',
        text: "Número máximo de usuarios registrados para su plan",
        showConfirmButton: true,
      });
    }
    
  }

  editUser(id: number, user: User) {
    this.store.dispatch(updateUser({ id: id, content: user }));
    this.checkStatusRequest(
      'Usuario actualizado con éxito',
      'Ha sucedido un error, por favor intente de nuevo'
    );
  }

  getDeleteUserConfirmation(user: User) {
    Swal.fire({
      title: `¿Está seguro de eliminar al usuario:  ${user.name}?`,
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0096d2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(user);
      }
    });
  }

  deleteUser(user: User) {
    const userId = user.id!;
    this.store.dispatch(removeUser({ id: userId }));
    this.checkStatusRequest(
      'Usuario eliminado con éxito',
      'Ha sucedido un error, por favor intente de nuevo'
    );
  }

  deactivateUserUser(user: User) {
    if (user.status === 'INACTIVE') {
      this.dialogService.showToast('El usuario ya se encuentra desactivado');
      return;
    } else {
      this.store.dispatch(
        updateUser({
          id: user.id!,
          content: {
            ...user,
            status: 'INACTIVE',
          },
        })
      );
      this.checkStatusRequest(
        'Usuario desactivado con éxito',
        'Ha sucedido un error, por favor intente de nuevo'
      );
    }
  }

  // Dialog | Modal Control
  openUserEditDialog(user: User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '60%',
      data: user,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.id) {
        this.editUser(result.id, result.user);
      }
    });
  }

  openUserRegisterDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      DebugerService.log('USER REGISTRATION DIALOG CLOSED');

      if (result && result.user) {
        this.registerUser(result.user, result.parentId, result.medicalCenterId);
      }
    });
  }

  private checkStatusRequest(successMessage: string, errorMessage: string) {
    this.statusSubscription = this.store
      .pipe(select(selectUserStatus))
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


  returRoleViewValue(role: string) {
    const viewValue = roleOptions.find(
      (option) => option.value === role
    )?.viewValue;
    return viewValue;
  }

  returnStatusViewValue(status: string) {
    const viewValue = statusOptions.find(
      (option) => option.value === status
    )?.viewValue;
    return viewValue;
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
}
