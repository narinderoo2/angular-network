import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninComponent } from './signin/signin.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgApexchartsModule } from 'ng-apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    SigninComponent,
    ResetpasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,NgApexchartsModule,
    AuthenticationRoutingModule,
      

  ],
  exports:[ResetpasswordComponent]
})
export class AuthenticationModule { }
