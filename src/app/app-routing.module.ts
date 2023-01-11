import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlanktemplateComponent } from './template/blanktemplate/blanktemplate.component';
import { HeaderComponent } from './template/header/header.component';


const routes: Routes = [

  {
    path: 'login', component: BlanktemplateComponent,
    loadChildren: () => import('./module/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'setup', component: HeaderComponent,
    loadChildren: () => import('./module/setup/setup.module').then(m => m.SetupModule)
  },
  {
    path: 'monitor', component: HeaderComponent,
    loadChildren: () => import('./module/monitor/monitor.module').then(m => m.MonitorModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 

})
export class AppRoutingModule { }
