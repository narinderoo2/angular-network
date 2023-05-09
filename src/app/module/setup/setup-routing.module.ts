import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionmanagementComponent } from './regionmanagement/regionmanagement.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { AlertCenterComponent } from './alert-center/alert-center.component';

const routes: Routes = [
  {path:'user-listing',component:UsermanagementComponent},
  {path:'region',component:RegionmanagementComponent},
  {path:'alert-center',component:AlertCenterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
