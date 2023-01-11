import { Injectable } from '@angular/core';
import { CommonConstants } from '../constant/common.constant';



@Injectable({
  providedIn: 'root'
})
export class ErrorsMessagesService {

  commonConstants=CommonConstants;


  public userManagementErrorMessages: any = {
    role: [
      { type: 'required', message: 'Please enter role' }],
    first_name: [
      { type: 'required', message: 'Please enter first name' },
      { type: 'pattern', message: 'First Name must be 2 to 15 characters (a-zA-Z)'}],
    last_name: [
      { type: 'required', message: 'Please enter last name' }],
    userPassword: [
      { type: 'lowerCase', message: 'Atleast one lowercase(a-z)' },
      { type: 'digit', message: 'Atleast one digit(0-9)' },
      { type: 'upperCase', message: 'Atleast one uppercase(A-Z)' },
      { type: 'specialCharacter', message: 'Atleast one symbol(!#$%*+/@)'},
      { type: 'range', message: ' Must 8-15 characters long ' }],
    confirmPassword: [
      { type: 'required', message: 'Please enter confirm password' },
      { type: 'confirmedValidator', message: 'Password and confirm password must be match.' },
    ],
    phone_number: [
      { type: 'required', message: 'Please enter phone number' },
      { type: 'minlength', message: ' Mobile number must be between ' + this.commonConstants.VALIDATION.mobileNumber.min + ' to ' + this.commonConstants.VALIDATION.mobileNumber.max + ' characters' },
    ],
    email: [
      { type: 'required', message: 'Please enter your email adrress' },
      { type: 'email', message: 'Please enter a valid email address' },
    ],
    description: [{ type: 'required', message: 'Please enter your reason' }],
    passowrdConfirmError: [
      { type: 'required', message: 'New password & confirm password does not match'},
    ],
  };


  public forgetPassowrd: any = {
    otp:[{type:'required',message:'Please enter otp'},
        {type:'pattern',message:'Please enter valid otp'}],
    role: [{ type: 'required', message: 'Please enter role' }],
    password: [
    { type: 'lowerCase', message: 'Atleast one lowercase(a-z)' },
    { type: 'digit', message: 'Atleast one digit(0-9)' },
    { type: 'upperCase', message: 'Atleast one uppercase(A-Z)' },
    { type: 'specialCharacter', message: 'Atleast one symbol(!#$%*+/@)'},
    { type: 'range', message: ' Must 8-15 characters long ' }],
   
    email: [
      { type: 'required', message: 'Please enter your email adrress' },
      { type: 'email', message: 'Please enter a valid email address' },
    ],
    confirmPassword: [
      { type: 'required', message: 'Please enter confirm password' },
      {
        type: 'confirmedValidator',
        message: 'Password and confirm password must be match.',
      },
    ],
  };
  public regionManagement: any = {
    country:[{type:'required',message:'Please enter country'},
            {type:'pattern',message:'Please enter valid country'}],
    description: [ { type: 'required', message: 'Please enter description' },
      { type: 'pattern', message: 'Please enter valid description' }],
    state: [ { type: 'required', message: 'Please enter state' },
      { type: 'pattern', message: 'Please enter valid state' }],
    city: [ { type: 'required', message: 'Please enter city' },
      { type: 'pattern', message: 'Please enter valid city' }],
    latitude: [{ type: 'pattern', message: 'Please enter valid latitude 90 to -90' }],
    longitude : [ { type: 'pattern', message: 'Please enter valid longitude 180 to -180' }],
      
      

  };



}
