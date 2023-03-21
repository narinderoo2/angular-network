import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { NetworkteplogyComponent } from './networkteplogy/networkteplogy.component';
import { GisComponent } from './gis/gis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegionTreemapComponent } from './region-treemap/region-treemap.component';


@NgModule({
  declarations: [NetworkteplogyComponent, GisComponent, RegionTreemapComponent],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    
    FormsModule
  ]
})
export class MonitorModule { }
