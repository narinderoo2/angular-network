import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private router:Router) { }



  validateAllFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field)
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFields(control);
      }
    });
    return formGroup;
  }


  resetForm(formGroup: UntypedFormGroup){
    Object.keys(formGroup.controls).forEach((field) => {
      formGroup.value[field]=''
    });
    return formGroup;
  }

  routerNavigate(routing:string){
    return this.router.navigate([routing])

  }


}
