import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { InputProps } from 'src/app/common/interfaces/input.interface';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-text-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent  {
  @Input() inputData!: InputProps;
  @Input() customValidators: ValidatorFn[] = []; 

  formControl = new FormControl('', [
    ...this.customValidators ,
  ]);

    // emailFormControl = new FormControl('', [
    //  Validators.required,
    //  Validators.email,
   
    // ]);
  
    matcher = new MyErrorStateMatcher();

}


