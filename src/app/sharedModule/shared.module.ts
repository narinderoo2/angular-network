import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeletepopupComponent } from '../shared/componet/deletepopup/deletepopup.component';
import { GlobelspinnerComponent } from '../shared/componet/globelspinner/globelspinner.component';
import { CommonformComponent } from '../shared/componet/commonform/commonform.component';



@NgModule({
  declarations: [ DeletepopupComponent,GlobelspinnerComponent,CommonformComponent],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule
  ],
  exports:[FormsModule, ReactiveFormsModule,DeletepopupComponent,GlobelspinnerComponent,CommonformComponent],
})
export class SharedModule { }
