import { ValidatorFn } from "@angular/forms";

export interface InputProps {
  label: string;
  errorText?: string;
  errorTextRequired?: string;
  placeholder?: string;
  validators: ValidatorFn[]; 
  type: "email" | "password" | "text" | "number" | "date";
}