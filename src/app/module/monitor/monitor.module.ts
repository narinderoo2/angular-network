import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { NetworkteplogyComponent } from './networkteplogy/networkteplogy.component';


@NgModule({
  declarations: [NetworkteplogyComponent],
  imports: [
    CommonModule,
    MonitorRoutingModule
  ]
})
export class MonitorModule { }
