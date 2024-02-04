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




import { AlertCenterComponent } from './alert-center/alert-center.component';

import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';

import { EditorModule } from 'primeng/editor';

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
		MultiSelectModule,
		DropdownModule,
    InputTextModule,
    EditorModule,    
  ],
  exports:[]
})
export class SetupModule { }
