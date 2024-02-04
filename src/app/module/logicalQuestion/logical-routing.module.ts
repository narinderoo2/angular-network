import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { AnswerComponent } from './answer/answer.component';

const routes: Routes = [
  {path:'',component:QuestionsComponent},
  {path:'questions',component:AnswerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogicalRoutingModule { }
