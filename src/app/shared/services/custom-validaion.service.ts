import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidaionService {

  constructor() { }


  static passwordCheck(control: FormControl) {
    let validationMap: any = {};
    if (control.value) {
      const isWhitespace = control.value.length === 0;
      if (isWhitespace) {
        //validationMap['required'] = true;
      }
      const lowerCase = control.value.match(/\d/);
      if (!lowerCase) {
        validationMap['digit'] = true;
      }

      const digit = control.value.match(/[A-Z]/);
      if (!digit) {
        validationMap['upperCase'] = true;
      }
      const upperCase = control.value.match(/[a-z]/);
      if (!upperCase) {
        validationMap['lowerCase'] = true;
      }

      const specialCharacter = control.value.match(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
      );
      if (!specialCharacter) {
        validationMap['specialCharacter'] = true;
      }

      const minMaxCharacters =
        control.value.length < 8 || control.value.length > 15;

      if (minMaxCharacters) {
        validationMap['range'] = true;
      }
    } else {
      validationMap['required'] = true;
      validationMap['digit'] = true;
      validationMap['lowerCase'] = true;
      validationMap['upperCase'] = true;
      validationMap['specialCharacter'] = true;
      validationMap['range'] = true;
    }
    return validationMap;
  }


}
