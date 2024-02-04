import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  providers: [DialogService, MessageService]

})
export class QuestionsComponent implements OnInit {

  name_of_questions: any = [
    { name: 'Array To Object', id: 'array_to_object' },
    { name: 'Array.from()', id: 'array_from' },
  ]

  questions_with_answer: any = {
    array_to_object:
    {
      name: 'Array To Change Object',
      questions: `arr = [a,b,c]  change to {1:a, 2:b, 3:c}`,
      answer: ` 
    const arr = ['a','b','c']
    let obj ={}
    arr.map((item,index)=>{ obj[index]=item })`},
    array_from:
    {
      name: 'Array.from()',
      questions: `Without for loop continou number get in array ?`,
      answer: ` 
      Array.from(ab,index => console.log(ab,index*2) )
      let data = Array.from({length:5},(arr,value)=> value+1)
      [1,2,3,4,5]
      `},
  }

  modalReference: any;
  answer_show: any = {}
  constructor(
    private _modalService: NgbModal,
  ) { }
  ref: DynamicDialogRef;

  ngOnInit() {
    var a = {}
    var b:any = {name:'b'}
    var c:any = {name:'c'}

    a[b]=111;
    a[c]=222;

    console.log(a[c]);
    



  }




  openPopUp(content, tag) {
    this.answer_show = this.questions_with_answer[tag.id]
    this.modalReference = this._modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'm-content ',
    });
  }

}
