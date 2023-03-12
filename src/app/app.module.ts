import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './shared/componet/sidebar/sidebar.component';
import { HeaderComponent } from './template/header/header.component';
import { BlanktemplateComponent } from './template/blanktemplate/blanktemplate.component';
import { TestComponent } from './module/test/test.component';
import { HttpClientModule } from '@angular/common/http';
import { DpDatePickerModule } from 'ng2-date-picker';
import { ThemService } from './shared/services/them.service';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    BlanktemplateComponent,
    TestComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,

    DataTablesModule,

    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DpDatePickerModule,

    // NgApexchartsModule,
    
    // NgApexchartsModule,
    
  ],
  providers: [ThemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
