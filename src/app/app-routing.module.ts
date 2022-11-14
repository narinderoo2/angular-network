import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlanktemplateComponent } from './template/blanktemplate/blanktemplate.component';
import { HeaderComponent } from './template/header/header.component';


const routes: Routes = [
  {
    // path: 'dashboard', component: BlanktemplateComponent,
    path: 'login', component: BlanktemplateComponent,
    loadChildren: () => import('./module/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'setup', component: HeaderComponent,
    loadChildren: () => import('./module/setup/setup.module').then(m => m.SetupModule)
  },
  // dashboard
  // {
  //   path: '', component: HeaderComponent,
  //   loadChildren: () => import('./module/dashboard/dashboard.module').then(m => m.DashboardModule)
  // },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  //  {path: 'graphDetails', component: GraphDetailComponent},
  { path: '**', redirectTo: 'dashboard' },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 

})
export class AppRoutingModule { }
