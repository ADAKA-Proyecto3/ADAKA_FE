import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthCustomDialogComponent } from '../../components/auth-dialog/auth-custom-dialog.component';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { RegisterPageController } from './register-page.controller';
import { User } from '../../../models/user.interface';
import { SelectOption } from 'src/app/common/interfaces/option.interface';
import { CRHttpService } from 'src/app/services/http-service/costa_rica-http.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPage implements OnInit {
  plans: SelectOption[] = [
    { value: 'BASIC', viewValue: 'Basic' },
    { value: 'PRO', viewValue: 'Pro' },
    { value: 'ENTERPRISE', viewValue: 'Enterprise' },
  ];

  provincias: SelectOption[] = [
    { value: '1', viewValue: 'San Jose' },
    { value: '2', viewValue: 'Alajuela' },
    { value: '3', viewValue: 'Cartago' },
    { value: '4', viewValue: 'Heredia' },
    { value: '5', viewValue: 'Guanacaste' },
    { value: '6', viewValue: 'Puntarenas' },
    { value: '7', viewValue: 'Limon' },
  ];

  cantonOptions: SelectOption[] | undefined;
  distritoOptions: SelectOption[] | undefined;

  isLinear = true;
  hide = true;

  public registerForm: FormGroup = {} as FormGroup;
  paidFor = false;

  constructor(
    private readonly registerPageController: RegisterPageController,
    private readonly router: Router,
    private readonly crHttpService: CRHttpService,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder
  ) {



    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        // this.passwordValidator,
      ]),
    });

    
  }

 

  // userDataFormGroup = this._formBuilder.group({
  //   //firstCtrl: ['', Validators.required],
  //   name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  //   phone: new FormControl('', [Validators.required,]),
  //   email: new FormControl('', [Validators.required,Validators.email]),
  //   password: new FormControl('', [Validators.required]),
  // });

  secondFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
    provincia: ['', Validators.required],
    canton: ['', Validators.required],
    distrito: ['', Validators.required],
    address: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    plan: ['', Validators.required],
  });

  

  ngOnInit(): void {
   
  }

  openDialog() {
    const dialogRef = this.dialog.open(AuthCustomDialogComponent, {
      //width: '60%',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.paidFor) {
        this.paidFor = result.paidFor;
        await this.submitRegistration();
        //this.paidFor===true ? this.router.navigateByUrl( `${UrlPages.AUTH}/${UrlPages.LOGIN}`) : null;
      }
    });
  }

  private async submitRegistration() {
    if (this.paidFor === true) {
      // const user: User = {
      //   name: this.registerForm.value.name,
      //   phone: this.registerForm.value.phone,
      //   email: this.registerForm.value.email,
      //   password: this.registerForm.value.password,
      //   role: 'ADMIN',
      //   status: 'ACTIVE',
      // };

      // const userRegistration = await this.registerPageController.registerUser(
      //   user
      // );

      //this.router.navigateByUrl( `${UrlPages.AUTH}/${UrlPages.LOGIN}`);
    }
  }

  public onContinue() {}

  public onSubmit() {
    // if (this.registerForm.invalid) {
    //   return;
    // }
    this.openDialog();
  }

   error = (controlName: string, errorName: string) => {
      //console.log(controlName)
      //console.log(this.registerForm.controls[controlName].hasError(errorName))

      const result = this.registerForm.controls[controlName].hasError(errorName);
      console.log(result)
      return this.registerForm.controls[controlName].hasError(errorName);
        //return this.userDataFormGroup.controls[controlName as keyof typeof this.userDataFormGroup.controls].hasError(errorName);
  };

  private passwordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    if (hasNumber && hasSpecial && hasUpperCase && password.length >= 8) {
      return null;
    }

    return { invalidPassword: true };
  }

  returnToLogin() {
    this.router.navigateByUrl(`${UrlPages.AUTH}/${UrlPages.LOGIN}`);
  }

  public async getCantones() {
    const provinciaId = this.secondFormGroup.value.provincia;

    if (!provinciaId) { return; }

    const cantones = await this.crHttpService.getCanton(provinciaId);
    if (cantones) {
      this.cantonOptions = Object.keys(cantones).map((key) => {
        return {
          value: key,
          viewValue: cantones[key],
        };
      });
    }
    this.secondFormGroup.controls.canton.setValue('');
  }

  public async getDistritos() {
    const cantonId = this.secondFormGroup.value.canton;
    const provinciaId = this.secondFormGroup.value.provincia;

    if (!cantonId || !provinciaId) { return; }

    const distritos = await this.crHttpService.getDistrito( provinciaId, cantonId );

    if (distritos) {
      this.distritoOptions = Object.keys(distritos).map((key) => {
        return {
          value: key,
          viewValue: distritos[key],
        };
      });
    }
    this.secondFormGroup.controls.distrito.setValue('');
  }
}
