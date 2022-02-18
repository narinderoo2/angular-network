import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {


  resetPassword:FormGroup

  verify:string = 'verify';
  constructor(
    private fb:FormBuilder
  ) {

    this.resetPassword = this.fb.group({
      email:['',[Validators.required]]
    })
   }

  ngOnInit(): void {
    this.verify='otpVerify'
  }

  resetPasswordUser(){
    console.log(this.resetPassword.value);
    this.verify ='otpVerify'
    
  }

  otpChecked:any;
  otpBtn:boolean = false

  optCheck(value){
    if(this.otpChecked.length == '5'){
      let regex = "^[0-9]*$"
      let a = this.otpChecked.match(regex)
if(a != null ){
  console.log(this.otpChecked);
  this.otpBtn = true

}   else{
  this.otpBtn = true
  return  

}




      this.otpBtn = true
    }else{
      this.otpBtn = false
      return
    }
    

    
  }


  otpVerifyUser(){
    this.verify = 'passVerify'
  }

}
