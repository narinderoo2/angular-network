import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/sharedModule/shared.module';
import { DirectiveModule } from 'src/app/sharedModule/directive.module';
import { RegionmanagementComponent } from './regionmanagement/regionmanagement.component';



import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import { AlertCenterComponent } from './alert-center/alert-center.component';


@NgModule({
  declarations: [UsermanagementComponent,RegionmanagementComponent, AlertCenterComponent],
  imports: [
    CommonModule,
    SetupRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
    DirectiveModule,



    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    
  ],
  exports:[]
})
export class SetupModule { }
