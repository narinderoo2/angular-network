
import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appRegexWithvalidation]',
  providers: [
    { multi: true, useExisting: forwardRef(() => RegexWithvalidationDirective), provide: NG_VALIDATORS }
  ]
})
export class RegexWithvalidationDirective {
  private _PHONENUMBER_REGEXP = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
  constructor() {
  }

  validate(formController: AbstractControl) {
    return Object.assign(
      this._phonenumberValidator(formController)
    )
  }

  private _isEmptyInputValue(value: any): boolean {
    return value == null || value.length === 0;
  }

  private _phonenumberValidator(formController: AbstractControl) {
    return this._PHONENUMBER_REGEXP.test(formController.value) ? {} : { phonenumber: true };
  }
}