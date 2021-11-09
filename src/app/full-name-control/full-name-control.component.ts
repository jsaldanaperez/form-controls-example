import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-full-name-control',
  templateUrl: './full-name-control.component.html',
  styleUrls: ['./full-name-control.component.scss'],
  providers: [
    {   
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FullNameControlComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FullNameControlComponent
    }
  ]
})
export class FullNameControlComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() validators?: ValidatorFn[];
  
  firstNameControl = new FormControl('', Validators.minLength(2))
  lastNameControl = new FormControl('', Validators.minLength(2))
  formGroup = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl
  });
  

  onChange = (fullName: any) => {}

  constructor() { 


    this.formGroup.valueChanges.subscribe(() =>{
      this.onChange({
        firstName: this.firstNameControl.value,
        lastName: this.lastNameControl.value
      })
    });
  }

  ngAfterContentInit(): void {
    console.log('validators', this.validators)
    if(this.validators){
      console.log('validators adding', this.validators.length)
      this.formGroup.addValidators(this.validators)
    }
  }


  writeValue(obj: any): void {
    if(obj){

    }
    this.formGroup.patchValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    
  }
  validate(control: AbstractControl): ValidationErrors | null {
    const isRequired = control.hasValidator(Validators.required);
    const isRequiredValid = isRequired ? this.firstNameControl.value && this.lastNameControl.value : true;
    const firstNameValid = this.firstNameControl.valid;
    const lastNameValid = this.lastNameControl.valid;
    return isRequiredValid && this.formGroup.valid && firstNameValid && lastNameValid ? null : { fullNameError: 'invalid value'}
  }

  ngOnInit(): void {
  }

}
