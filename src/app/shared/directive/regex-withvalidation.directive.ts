
import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { regexValidation } from 'src/app/shared/constant/regexValidation'

@Directive({
  selector: '[appRegexWithvalidation]',
  providers: [
    { multi: true, useExisting: forwardRef(() => RegexWithvalidationDirective), provide: NG_VALIDATORS }
  ]
})
export class RegexWithvalidationDirective {
  @Input() valueValidation?: any;
  private regexvalidation = regexValidation;

  validate(formController: AbstractControl) {
    console.log(formController,this.valueValidation);
    return Object.assign(
      
      
      this.reactivateFormCheck(formController)
    )
  }


  private reactivateFormCheck(formController: AbstractControl) {
    if (!formController.value) {
      return {}
    }

    console.log(formController.value);
    
    return this.regexvalidation.regexUse[this.valueValidation].test(formController.value) ? {} : { pattern: true };
  }
}