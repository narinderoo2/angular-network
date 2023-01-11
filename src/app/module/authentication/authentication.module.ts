import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninComponent } from './signin/signin.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DirectiveModule } from 'src/app/sharedModule/directive.module';
import { SharedModule } from 'src/app/sharedModule/shared.module';


@NgModule({
  declarations: [
    SigninComponent,
    ResetpasswordComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    AuthenticationRoutingModule,SharedModule,DirectiveModule
      

  ],
  exports:[ResetpasswordComponent]
})
export class AuthenticationModule { }
