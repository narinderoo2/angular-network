import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from 'src/app/shared/componet/sidebar/sidebar.component';
import { NumberDirective } from '../shared/directive/number.directive';



@NgModule({
  declarations: [NumberDirective ],
  imports: [
    CommonModule
  ],
  exports:[NumberDirective]
})
export class SharedModule { }
