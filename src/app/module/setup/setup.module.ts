import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'src/app/sharedModule/shared.module';


@NgModule({
  declarations: [UsermanagementComponent],
  imports: [
    CommonModule,
    SetupRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
    
  ]
})
export class SetupModule { }
