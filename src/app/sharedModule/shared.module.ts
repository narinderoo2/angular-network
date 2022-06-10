import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DigitOnlyDirective } from '../shared/directive/digit-only.directive';



@NgModule({
  declarations: [DigitOnlyDirective ],
  imports: [
    CommonModule
  ],
  exports:[DigitOnlyDirective]
})
export class SharedModule { }
