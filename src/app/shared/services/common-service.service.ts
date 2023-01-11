import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private router:Router) { }



  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field)
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
    return formGroup;
  }


  resetForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach((field) => {
      formGroup.value[field]=''
    });
    return formGroup;
  }

  routerNavigate(routing:string){
    return this.router.navigate([routing])

  }


}
