import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegexWithvalidationDirective } from '../shared/directive/regex-withvalidation.directive';



@NgModule({
  declarations: [RegexWithvalidationDirective],
  imports: [CommonModule],
  exports:[RegexWithvalidationDirective]
})
export class DirectiveModule { }
