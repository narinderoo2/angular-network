import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogicalRoutingModule } from './logical-routing.module';
import { QuestionsComponent } from './questions/questions.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AnswerComponent } from './answer/answer.component';
import { TableModule } from 'primeng/table';
import { SplitterModule } from "primeng/splitter";


@NgModule({
  declarations: [
    QuestionsComponent,
    AnswerComponent
  ],
  imports: [
    CommonModule,
    LogicalRoutingModule,
    DynamicDialogModule,
        ToastModule,
        // TableModule,
        ButtonModule

        ,
        ToastModule,
        SplitterModule,
  ]
})
export class LogicalModule { }
