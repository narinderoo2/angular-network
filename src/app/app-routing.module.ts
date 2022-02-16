import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './template/header/header.component';


const routes: Routes = [
  // {path:'',component:HeaderComponent},
  {path:'',component:HeaderComponent,loadChildren:() => import('./module/dashboard/dashboard.module').then(m=> m.DashboardModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
