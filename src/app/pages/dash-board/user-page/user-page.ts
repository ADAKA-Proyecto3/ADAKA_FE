import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, filter, take } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { loadActiveUserSuccess, updateActiveUser } from 'src/app/store/actions/activeUser.actions';
import { AppState } from 'src/app/store/app.state';
import { UserHttpService } from 'src/app/services/http-service/user-http.service';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';
import { Utils } from 'src/app/common/utils/app-util';
import { PageRouterService } from 'src/app/services/page-router-service/page-router.service';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.html',
  styleUrls: ['./user-page.scss'],
})
export class UserPage implements OnInit, OnDestroy {
  @Input() user: any;
  userForm: FormGroup = {} as FormGroup;
  passwordForm: FormGroup = {} as FormGroup;
  activeUser: any;
  hide = true;

  expiredPassword = false;
  selectedTabIndex = 0;
  private activeUserSuscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private readonly store: Store<AppState>,
    private readonly userHttpService: UserHttpService,
    private readonly dialogService: DialogService,
    private readonly pageRouter: PageRouterService
  ) {}
 
  ngOnDestroy(): void {
    this.activeUserSuscription.unsubscribe();
  }

  ngOnInit() {
    this.initForms();

    this.activeUserSuscription = this.store
      .select('user')
      .pipe(
        filter((activeUser) => activeUser.status === 'success'),
        take(1)
      )
      .subscribe((activeUser) => {
        this.activeUser = activeUser.activeUser.id;

        this.expiredPassword =
          activeUser.activeUser.status === 'FREEZE' ? true : false;

        this.userForm.patchValue({
          name: activeUser.activeUser.name || '',
          phone: activeUser.activeUser.phone || '',
          email: activeUser.activeUser.email || '',
        });
      });
  }

  initForms() {
    this.userForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      phone: new FormControl('', [
        this.digitsOnly,
        Validators.required,
        Validators.minLength(8),
      ]),
      email: new FormControl('', [Validators.required]),
    });
    this.passwordForm = this.fb.group({
      password: new FormControl('', [
        Validators.required,
        this.validatePassword,
      ]),
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const user: User = {
      name: this.userForm.value.name,
      phone: this.userForm.value.phone,
      email: this.userForm.value.email,
    };

    console.log(user, this.activeUser);
    this.store.dispatch(
      updateActiveUser({ id: this.activeUser, content: user })
    );
  }

  onSubmitPassword() {
    if (this.passwordForm.invalid) {
      return;
    }

    const user: User = {
      name: '',
      phone: '',
      email: '',
      password: this.passwordForm.value.password,
    };

    this.modPassword(user);
  }



  async modPassword(user: User): Promise<any> {
    try {
      DebugerService.log('Requesting HTTP PUT change password');
      console.log(user);

      // Realizar la solicitud HTTP y obtener el Observable
      const result$ = this.userHttpService.editUserPassword(this.activeUser, user);

      // Suscribirse a la respuesta del servidor
      result$.subscribe(
        (result) => {
          console.log(result);
          // Aquí puedes manejar la respuesta exitosa
          this.store.dispatch(loadActiveUserSuccess({user : result} ));
          this.dialogService.showToast('Contraseña modificada con éxito');
          this.pageRouter.route(`/${UrlPages.DASHBOARD}/${UrlPages.MAIN}`);
        },
        (error) => {
          // Aquí puedes manejar el error
          Utils.showNotification({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al registrar la suscripción',
          });
        },
        () => {
          // Este bloque se ejecutará después de que la solicitud se complete
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      // Cualquier código que desees ejecutar después de la solicitud (puede estar vacío)
    }
  }


  get name() {
    return this.userForm.get('name');
  }
  get phone() {
    return this.userForm.get('phone');
  }
  get email() {
    return this.userForm.get('email');
  }

  error(control: string, errorType: string): boolean {
    const controlInstance = this.userForm.get(control);
    return controlInstance ? controlInstance.hasError(errorType) : false;
  }

  private digitsOnly(control: AbstractControl): { [key: string]: any } | null {
    const isValid = /^\d+$/.test(control.value); // This regular expression checks if the input contains only digits

    return isValid ? null : { digitsOnly: true };
  }

  private validatePassword(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    if (hasNumber && hasSpecial && hasUpperCase && password.length >= 8) {
      return null;
    }

    return { passwordInvalid: true };
  }

  limpiarContrasena() {
    this.passwordForm.reset();
  }

  expiredPasswordChange() {
    if (this.expiredPassword) return (this.selectedTabIndex = 2);

    return this.selectedTabIndex;
  }
}
