import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NestedJsonComponent } from './nested-json/nested-json.component';
import { DragdropserverComponent } from './dragdropserver/dragdropserver.component';

const routes: Routes = [
  {path:'',component:NestedJsonComponent},
  {path:'drag-drop',component:DragdropserverComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NmsRoutingModule { }
