import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {  HttpHeaders } from '@angular/common/http';
import { TestService } from '../test.service';
import { DatePickerComponent, DatePickerDirective, IDatePickerConfig, IDayCalendarConfig } from 'ng2-date-picker';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {



  


  testForm:FormGroup
  
//   file:any= {
//   lastModified: 1639552587120,          
// name: "Screenshot (13).png",
// size: 453581,
// type: "image/png",
// webkitRelativePath: "",
// }

public filterForm: FormGroup;
public displayDate;

@ViewChild('datePicker') datePicker: DatePickerComponent;
@ViewChild('dateDirectivePicker') datePickerDirective: DatePickerDirective;


@ViewChild("dateFromDp") public dateFromDp: DatePickerComponent; 
 @ViewChild("dateToDp") public dateToDp: DatePickerComponent; 

// public dayPickerConfig = <IDayCalendarConfig>{
//     locale: "de",
//     format: "DD.MM.YYYY",
//     monthFormat: "MMMM, YYYY",
//     firstDayOfWeek: "mo"
//   };


  // config: IDatePickerConfig = {
    public dayPickerConfig = <IDayCalendarConfig>{
    firstDayOfWeek: 'mo',
    monthFormat: 'MMM, YYYY',
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: true,
    closeOnSelectDelay: 100,
    openOnFocus: true,
    openOnClick: true,
    onOpenDelay: 0,
    weekDayFormat: 'ddd',
    // appendTo: document.body,
    showNearMonthDays: true,
    showWeekNumbers: false,
    enableMonthSelector: true,
    yearFormat: 'YYYY',
    showGoToCurrent: true,
    dayBtnFormat: 'DD',
    monthBtnFormat: 'MMM',
    hours12Format: 'hh',
    hours24Format: 'HH',
    meridiemFormat: 'A',
    minutesFormat: 'mm',
    minutesInterval: 1,
    secondsFormat: 'ss',
    secondsInterval: 1,
    showSeconds: false,
    showTwentyFourHours: false,
    timeSeparator: ':',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false,
    hideInputContainer: false,
  };


  constructor(private fom:FormBuilder,private http:HttpClient,private service:TestService
    ) {
      this.createForm();
    this.testForm = this.fom.group({
      name:[''],
      image:[''],
      password:[''],
    })}

imageName:any='Host Management-Tue Mar 15 2022 12_02.xlsx'


   ngOnInit(): void {

this.filterForm.get("dateFrom").valueChanges.subscribe(value => {
  console.log(value);
  
  // this.dayPickerConfig = {
  //   min: value,
  //   ...this.dayPickerConfig
  // }
});


  }

  dateTimeSelected(data) {
    // console.log('date time clicked',data)
    this.dayPickerConfig = {
          min: this.filterForm.value.dateFrom,
          ...this.dayPickerConfig,

        }
    
    // this.datePickerDirective.api.close();
  }

  

  
  private createForm(): void {
    this.filterForm = this.fom.group({
      dateFrom: new FormControl(),
      dateTo: new FormControl(),
    });
  }



file:any = []
fileArray:any = []

  fileDAtda(data){
    this.file = []
    this.file= data.target.files
    for(let i =0; this.file.length>  i ; i++){
      // console.log(i,this.file[i]);
      this.fileArray.push(this.file[i])

    }

  }

  filesToUpload: Array<File> = [];
  DataSend(){

    let data = new FormData()
    data.append('id','1'),
    data.append('name','thakur'),

this.fileArray.forEach(element => {
console.log(element);

      data.append('file',element)

})

 
    // this.filesToUpload = this.fileArray;
    this.service.postAPIMethod('http://localhost:5000/profile', data).subscribe(res=>{
      console.log(res);
      
    })
  }




}
