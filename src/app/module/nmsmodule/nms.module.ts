import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NmsRoutingModule } from './nms-routing.module';
import { DragdropserverComponent } from './dragdropserver/dragdropserver.component';
import {DragulaModule} from 'ng2-dragula';
import { NestedJsonComponent } from './nested-json/nested-json.component';

import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
  declarations: [NestedJsonComponent, DragdropserverComponent ],
  imports: [
    CommonModule,
    NmsRoutingModule,
    DragulaModule.forRoot(),
    AngularDraggableModule
  ]
})
export class NmsModule { }
