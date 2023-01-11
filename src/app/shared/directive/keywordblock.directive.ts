import { Directive, ElementRef, HostListener, Input, SimpleChanges } from '@angular/core';
import { regexValidation } from 'src/app/shared/constant/regexValidation'

@Directive({
  selector: '[appKeywordblock]'
})
export class KeywordblockDirective {
  @Input() valueValidation?: any;
  regexvalidation=regexValidation;  // all regex under the regexValidation

  private navigationKeys = ['Backspace',
    'Delete','Tab','Escape','Enter','Home','End',
    'ArrowLeft','ArrowRight','Clear','Copy','Paste',
  ];

  private regex: RegExp;
  inputElement: HTMLInputElement;
  constructor(private el: ElementRef,) {
    this.inputElement = el.nativeElement;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): any {
let newValue = this.forecastValue(e.key)    
    // let newValue = this.el.nativeElement.value.concat(e.key);        
    if((this.valueValidation == 'latitude' ||this.valueValidation == 'longitude') && newValue === '-') return newValue // first char (-/+) not working so that use this condition
    if (this.navigationKeys.indexOf(e.key) > -1)  return;    
    this.regex = new RegExp(this.regexvalidation.regexUse[this.valueValidation]);
    let checkValidation = this.regex.test(newValue)    
    console.log(checkValidation,newValue);
    
   if (!checkValidation) {
      e.preventDefault()
      return 
    } else {
      return newValue
    }
  }


  private forecastValue(key: string): string {
    const selectionStart = this.inputElement.selectionStart;
    const selectionEnd = this.inputElement.selectionEnd;
    const oldValue = this.inputElement.value;

   if (oldValue) {     
      const selection = oldValue.substring(selectionStart, selectionEnd);
      return selection
        ? oldValue.replace(selection, key)
        : oldValue.substring(0, selectionStart) +
        key +
        oldValue.substring(selectionStart);
    }else{
      return oldValue.substring(0, selectionStart) +
      key +
      oldValue.substring(selectionStart);
    }
  }

}
