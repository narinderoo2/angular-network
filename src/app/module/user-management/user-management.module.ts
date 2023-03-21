import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { PermissionComponent } from './permission/permission.component';
import { SharedModule } from 'src/app/sharedModule/shared.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    UserComponent,
    RoleComponent,
    PermissionComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule,
    DataTablesModule,
  ]
})
export class UserManagementModule { }
