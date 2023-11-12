import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.html',
  styleUrls: ['./user-page.scss'],
})
export class UserPage implements OnInit {
  @Input() user: any;
  userForm: FormGroup = {} as FormGroup;
  passwordForm: FormGroup = {} as FormGroup;
  activeUser: any;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit() {
    this.initForms();
    this.store
      .select('user')
      .pipe(
        filter((activeUser) => activeUser.status === 'success'),
        take(1)
      )
      .subscribe((activeUser) => {
        this.activeUser = activeUser.activeUser.id;

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
    //Aqui la llamada a la api
  }

  onSubmitPassword() {
    if (this.passwordForm.invalid) {
      return;
    }
    const password = this.passwordForm.value.password;

    console.log(password, this.activeUser);
    //Aqui la llamada a la api
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
}
