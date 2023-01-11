import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegexWithvalidationDirective } from '../shared/directive/regex-withvalidation.directive';
import { KeywordblockDirective } from '../shared/directive/keywordblock.directive';



@NgModule({
  declarations: [RegexWithvalidationDirective,KeywordblockDirective],
  imports: [CommonModule],
  exports:[RegexWithvalidationDirective,KeywordblockDirective]
})
export class DirectiveModule { }
