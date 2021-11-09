import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'form-controls-example';
  fullNameControl = new FormControl(null, [Validators.required]);
  formGroup = new FormGroup({
    fullName: this.fullNameControl
  })
  validators = [this.customNameValidator()]

  update(){
    console.log(this.formGroup.value)
    console.log(JSON.stringify(this.formGroup.errors))
    this.formGroup.updateValueAndValidity();
  }

  customNameValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value ? control.value.lastName : '';
      return forbidden === 'perez' ? {forbiddenName: {value: control.value}} : null;
    };
  }
}
