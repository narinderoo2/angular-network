import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GisComponent } from './gis/gis.component';
import { NetworkteplogyComponent } from './networkteplogy/networkteplogy.component';

const routes: Routes = [
  {path:'',component:GisComponent},
  {path:'network-teplogy',component:NetworkteplogyComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
