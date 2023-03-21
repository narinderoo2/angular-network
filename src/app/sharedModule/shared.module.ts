import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeletepopupComponent } from '../shared/componet/deletepopup/deletepopup.component';
import { GlobelspinnerComponent } from '../shared/componet/globelspinner/globelspinner.component';
import { CommonformComponent } from '../shared/componet/commonform/commonform.component';
import { DivSpinnerComponent } from '../shared/componet/div-spinner/div-spinner.component';
import { DirectiveModule } from './directive.module';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [ DeletepopupComponent,GlobelspinnerComponent,CommonformComponent,DivSpinnerComponent],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule,DirectiveModule,NgSelectModule
  ],
  exports:[FormsModule, ReactiveFormsModule,DeletepopupComponent,GlobelspinnerComponent,CommonformComponent,
    DivSpinnerComponent],
})
export class SharedModule { }
