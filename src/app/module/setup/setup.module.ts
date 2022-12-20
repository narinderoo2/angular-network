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


@NgModule({
  declarations: [UsermanagementComponent,RegionmanagementComponent],
  imports: [
    CommonModule,
    SetupRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
    DirectiveModule
    
  ],
  exports:[]
})
export class SetupModule { }
