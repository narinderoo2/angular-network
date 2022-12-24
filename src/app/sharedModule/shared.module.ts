import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeletepopupComponent } from '../shared/componet/deletepopup/deletepopup.component';
import { GlobelspinnerComponent } from '../shared/componet/globelspinner/globelspinner.component';



@NgModule({
  declarations: [ DeletepopupComponent,GlobelspinnerComponent],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule
  ],
  exports:[FormsModule, ReactiveFormsModule,DeletepopupComponent,GlobelspinnerComponent],
})
export class SharedModule { }
