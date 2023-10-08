
import { InputComponent } from './input.component';
import {
  ReactiveFormsModule, FormsModule
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import {NgIf} from '@angular/common';

@NgModule({
  declarations: [InputComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    NgIf
  ],
  exports: [InputComponent]
})

export class InputModule {}
