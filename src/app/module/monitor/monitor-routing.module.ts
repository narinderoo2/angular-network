import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GisComponent } from './gis/gis.component';
import { NetworkteplogyComponent } from './networkteplogy/networkteplogy.component';
import { RegionTreemapComponent } from './region-treemap/region-treemap.component';

const routes: Routes = [
  {path:'',component:GisComponent},
  {path:'network-teplogy',component:NetworkteplogyComponent},
  {path:'region-treemap',component:RegionTreemapComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
