import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './module/authentication/signin/signin.component';
import { BlanktemplateComponent } from './template/blanktemplate/blanktemplate.component';
import { HeaderComponent } from './template/header/header.component';


const routes: Routes = [
  // {path:'',component:HeaderComponent},
  {
    path: '', component: BlanktemplateComponent,
    loadChildren: () => import('./module/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  
  {
    path: 'dashboard', component: HeaderComponent,
    loadChildren: () => import('./module/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
