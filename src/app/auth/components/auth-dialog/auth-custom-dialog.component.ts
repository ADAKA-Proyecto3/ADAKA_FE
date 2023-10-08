import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentResult } from 'src/app/common/enums/payment-result.enum';

declare var paypal:any;
@Component({
  selector: 'app-custom-dialog',
  templateUrl: './auth-custom-dialog.component.html'
})
export class AuthCustomDialogComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef | undefined;
  
  paidFor = false;

  product = {
    price: 50,
    description: 'Pago único por registro ZHENAIR',
  };

  inputData:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref:MatDialogRef<AuthCustomDialogComponent>
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.renderPaypalButton();
  }



  closeDialog() {
    this.ref.close();
  }


  private renderPaypalButton() {
    paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color:  'blue',
          shape:  'rect',
          label:  'paypal',
          disableMaxWidth : true,
          with:  250,
        },
        fundingSource: paypal.FUNDING.PAYPAL,
        createOrder: (data:any, actions:any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price
                }
              }
            ]
          });
        },
        onApprove: async (data:any, actions:any) => {
          const order = await actions.order.capture();
        
          if (order.id && 
            order.intent === PaymentResult.INTENT && 
            order.status === PaymentResult.STATUS
            ){
            this.ref.close({ paidFor: true });
          }
        },
        onError: (err:any)  => {
          console.log(err);
        }
      })
      .render(this.paypalElement?.nativeElement);
  }
}