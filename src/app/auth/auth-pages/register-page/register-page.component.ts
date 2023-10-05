import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup = {} as FormGroup;

  constructor(private readonly router: Router) {}

  handler:any = null;
 
 
 
  
  ngOnInit(): void {

    //this.loadStripe();

    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        this.passwordValidator,
      ]),
    });
  }

  public error = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  };

  private passwordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    if (hasNumber && hasSpecial && hasUpperCase && password.length >= 8) {
      return null; // All criteria met, return null
    }

    return { invalidPassword: true }; // Return a key-value pair to indicate validation failure
  }

  // public onContinue(amount: number) {
  //   var handler = (<any>window).StripeCheckout.configure({
  //     key: 'pk_test_51Nxi9DCocwmaNldetlAyJLzPVIzTQHfLkIZg0S8BMwnDScH1ZGx5AlTY2OZcsMYdGIJrLllrvlM2YKGPm7eJfKcj00Q7bWBxMF',
  //     locale: 'es',
  //     token: function (token: any) {
  //       // You can access the token ID with `token.id`.
  //       // Get the token ID to your server-side code for use.
  //       console.log(token);
  //       alert('Token Created!!');
  //     },
  //   });

  //   handler.open({
  //     name: 'ZHENAIR',
  //     description: 'Suscripción mensual',
  //     amount: amount * 100,
  //   });
  // }

  onSubmit() {}

  // loadStripe() {
  //   if (!window.document.getElementById('stripe-script')) {
  //     var s = window.document.createElement('script');
  //     s.id = 'stripe-script';
  //     s.type = 'text/javascript';
  //     s.src = 'https://checkout.stripe.com/checkout.js';
  //     s.onload = () => {
  //       this.handler = (<any>window).StripeCheckout.configure({
  //         key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
  //         locale: 'auto',
  //         token: function (token: any) {
  //           // You can access the token ID with `token.id`.
  //           // Get the token ID to your server-side code for use.
  //           console.log(token);
  //           alert('Payment Success!!');
  //         },
  //       });
  //     };

  //     window.document.body.appendChild(s);
  //   }
  // }


}
