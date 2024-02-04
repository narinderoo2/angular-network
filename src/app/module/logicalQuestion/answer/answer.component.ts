import { Component, OnInit } from '@angular/core';


// import {Component} from '@angular/core';
// import {Product} from './product';
// import {ProductService} from './productservice';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';



@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  questions_with_answer:any={
    array_to_object:{name:'Array To Change Object',questions:`arr = [a,b,c]  change to {{  '{' }}1:a, 2:b, 3:c {{ '}'}}`}
  }



  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) { }

  ngOnInit() {
    // this.products = 'asdf'
  }

  selectProduct(product) {
    this.ref.close(product);
  }

}
