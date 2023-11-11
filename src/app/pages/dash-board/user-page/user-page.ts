import { Component,Input ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.html',
  styleUrls: ['./user-page.scss'],
})
export class UserPage implements OnInit {
  @Input() user: any;
  userForm: FormGroup = {} as FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      fullName: [this.user?.name, [Validators.required, Validators.maxLength(40)]],
      direction: [this.user?.direction, Validators.required],
      latitude: [this.user?.latitude, Validators.required],
      longitude: [this.user?.longitude, Validators.required],

    });
  }

  error(control: string, errorType: string): boolean {
    const controlInstance = this.userForm.get(control);
    return controlInstance ? controlInstance.hasError(errorType) : false;
  }

}