import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './module/test/test.component';
import { BlanktemplateComponent } from './template/blanktemplate/blanktemplate.component';
import { HeaderComponent } from './template/header/header.component';


const routes: Routes = [

  // {
  //   path: '', component: TestComponent,
   
  // },
  {
    path: 'login', component: BlanktemplateComponent,
    loadChildren: () => import('./module/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'dashboard', component: HeaderComponent,
    loadChildren: () => import('./module/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'setup', component: HeaderComponent,
    loadChildren: () => import('./module/setup/setup.module').then(m => m.SetupModule)
  },
  {
    path: 'monitor', component: HeaderComponent,
    loadChildren: () => import('./module/monitor/monitor.module').then(m => m.MonitorModule)
  },
  {
    path: 'user-management', component: HeaderComponent,
    loadChildren: () => import('./module/user-management/user-management.module').then(m => m.UserManagementModule)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 

})
export class AppRoutingModule { }
