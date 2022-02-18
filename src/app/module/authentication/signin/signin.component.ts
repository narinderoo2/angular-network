import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public signin:FormGroup

  constructor(
    private fb:FormBuilder

  ) { 
    this.signin = this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  signinUser(){
    console.log('===');
    
    console.log(this.signin.value);
    
  }

}
