import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UrlPages } from 'src/app/common/enums/url-pages.enum';
import { RegisterPageController } from './register-page.controller';
import { User } from '../../../models/user.interface';
import { SelectOption } from 'src/app/common/interfaces/option.interface';
import { CRHttpService } from 'src/app/services/http-service/costa_rica-http.service';
import { PlanPricing } from 'src/app/common/enums/plan-pricing.enum';
import { DebugerService } from 'src/app/services/debug-service/debug.service';
import { PaymentResult } from 'src/app/common/enums/payment-result.enum';
import { Suscription } from 'src/app/models/suscription.interface';
import { DialogService } from 'src/app/services/dialog-service/dialog.service';

declare var paypal: any;

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

  public adminDataForm: FormGroup = {} as FormGroup;

  /**PLANS */
  isChecked = true;
  basicPlan = PlanPricing.BASIC_PLAN;
  proPlan = PlanPricing.PRO_PLAN;
  enterpricePlan = PlanPricing.ENTERPRISE_PLAN;
  months = PlanPricing.MONTHS;
  planSelected: string = '';

  /**PAYPAL */
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef | undefined;
  private isPaypalButtonRendered = false;
  paidFor = false;



  constructor(
    private readonly registerPageController: RegisterPageController,
    private readonly router: Router,
    private readonly crHttpService: CRHttpService,
    private _formBuilder: FormBuilder,

    //*!
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {

    

    this.adminDataForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        this.validatePassword, 
      ]),
    });
  }

  get name() {
    return this.adminDataForm.get('name');
  }
  get phone() {
    return this.adminDataForm.get('phone');
  }
  get email() {
    return this.adminDataForm.get('email');
  }
  get password() {
    return this.adminDataForm.get('password');
  }

  validatePassword(control: AbstractControl): { [key: string]: any } | null {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    if (hasNumber && hasSpecial && hasUpperCase && password.length >= 8) {
      return null;
    }

    return { passwordInvalid: true };
  }

  addressForm = this._formBuilder.group({
    provincia: ['', Validators.required],
    canton: ['', Validators.required],
    distrito: ['', Validators.required],
    address: ['', Validators.required],
  });

  get provincia() {
    return this.addressForm.get('provincia');
  }
  get canton() {
    return this.addressForm.get('canton');
  }
  get distrito() {
    return this.addressForm.get('distrito');
  }
  get address() {
    return this.addressForm.get('address');
  }

  planSelectionForm = this._formBuilder.group({
    plan: ['', Validators.required],
  });

  get plan() {
    return this.planSelectionForm.get('plan');
  }

  togglePlanSelection() {
    const selectedPlan = this.planSelectionForm.value.plan;
    DebugerService.log('selected plan: ' + selectedPlan);
    if (selectedPlan !== null && selectedPlan !== undefined) {
      this.planSelected = selectedPlan;
      this.renderPaypalButton();
    } else {
      this.planSelected = '';
    }
  }

  returnToLogin() {
    this.router.navigateByUrl(`${UrlPages.AUTH}/${UrlPages.LOGIN}`);
  }

  public async getCantones() {
    const provinciaId = this.addressForm.value.provincia;

    if (!provinciaId) {
      return;
    }

    const cantones = await this.crHttpService.getCanton(provinciaId);
    if (cantones) {
      this.cantonOptions = Object.keys(cantones).map((key) => {
        return {
          value: key,
          viewValue: cantones[key],
        };
      });
    }
    this.addressForm.controls.canton.setValue('');
  }

  public async getDistritos() {
    const cantonId = this.addressForm.value.canton;
    const provinciaId = this.addressForm.value.provincia;

    if (!cantonId || !provinciaId) {
      return;
    }

    const distritos = await this.crHttpService.getDistrito(
      provinciaId,
      cantonId
    );

    if (distritos) {
      this.distritoOptions = Object.keys(distritos).map((key) => {
        return {
          value: key,
          viewValue: distritos[key],
        };
      });
    }
    this.addressForm.controls.distrito.setValue('');
  }

  private renderPaypalButton() {
    if (!this.isPaypalButtonRendered) {
      paypal
        .Buttons({
          style: {
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'paypal',
            disableMaxWidth: true,
            with: 150,
          },
          fundingSource: paypal.FUNDING.PAYPAL,
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.planSelected,
                  amount: {
                    currency_code: 'USD',
                    value: this.getPlandPrincing(),
                  },
                },
              ],
            });
          },
          onApprove: async (data: any, actions: any) => {
            const order = await actions.order.capture();

            if (
              order.id &&
              order.intent === PaymentResult.INTENT &&
              order.status === PaymentResult.STATUS
            ) {
              this.paidFor = true;

              const suscription: Suscription = {
                paymentId: order.id,
                planName: order.purchase_units[0].description,
                paymentAmount: order.purchase_units[0].amount.value,
                paymentCurrency: order.purchase_units[0].amount.currency_code,
              };

              this.submitRegistration(suscription);
              console.log(order);
            }
          },
          onError: (err: any) => {
            console.log(err);
          },
        })
        .render(this.paypalElement?.nativeElement);
    }
    this.isPaypalButtonRendered = true;
  }

  getPlandPrincing(): number {
    switch (this.planSelected) {
      case 'BASIC':
        return PlanPricing.BASIC_PLAN;
      case 'PRO':
        return PlanPricing.PRO_PLAN;
      case 'ENTERPRISE':
        return PlanPricing.ENTERPRISE_PLAN;
      default:
        return 0;
    }
  }

  private async submitRegistration(suscription: Suscription) {
    console.log(suscription);

    if (
      this.addressForm.value.provincia &&
      this.addressForm.value.canton &&
      this.addressForm.value.distrito &&
      this.addressForm.value.address
    ) {
      suscription.shippingAddress = {
        provincia: this.addressForm.value.provincia,
        canton: this.addressForm.value.canton,
        distrito: this.addressForm.value.distrito,
        address: this.addressForm.value.address,
      };

      const user: User = {
        name: this.adminDataForm.value.name,
        phone: this.adminDataForm.value.phone,
        email: this.adminDataForm.value.email,
        password: this.adminDataForm.value.password,
        // const userRegistration = await this.registerPageController.registerUser(
        //   user
        // );
        //this.router.navigateByUrl( `${UrlPages.AUTH}/${UrlPages.LOGIN}`);
      };

      const suscriptionObject ={
        name: this.adminDataForm.value.name,
        phone: this.adminDataForm.value.phone,
        email: this.adminDataForm.value.email,
        password: this.adminDataForm.value.password,
        paymentAmount: suscription.paymentAmount,
        paymentCurrency: suscription.paymentCurrency,
        paymentId: suscription.paymentId,
        planName: suscription.planName,
        shippingAddress: suscription.shippingAddress.provincia + ' ' + suscription.shippingAddress.canton + ' ' + suscription.shippingAddress.distrito + ' ' + suscription.shippingAddress.address

      }

      console.log(suscriptionObject);
      await this.registerPageController.registerUser(suscriptionObject);

      //console.log(user);
      //console.log(suscription);
      this.dialogService.showToast('Usuario registrado exitosamente');
    } else {
      // Handle the case where one or more values are not defined
    }
  }
}
