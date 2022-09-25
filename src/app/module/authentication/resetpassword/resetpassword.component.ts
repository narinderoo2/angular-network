import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke,
  ApexAxisChartSeries
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  updateSeries: any;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};


import { Routes, RouterModule, Router } from "@angular/router";



@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;

  public chartOptions: Partial<ChartOptions>;

  countDown: Subscription;
  currTime: Subscription;
  resetPassword: FormGroup
  optForm: FormGroup
  chatLoader: boolean = false;


  verify: string = 'emailVerify';

  couter: any;
  constructor(
    private fb: FormBuilder,
    private router:Router
  ) {

    this.resetPassword = this.fb.group({
      email: ['', [Validators.required]]
    })


    this.optForm = this.fb.group({
      email:[''],
      otp: ['', [Validators.required, Validators.minLength(5)]]
    })



  }

  ngOnInit(): void {
    // console.log(this.router);
    
    this.verify = 'otpVerify'
    this.timerStart(0)
    this.apexCounterChart()
    this.startTimer()
  }


  timeLeft: number = 60;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.chartOptions.series = [this.timeLeft * 1.7]
      } else {
        this.timeLeft = 60;
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  apexCounterChart() {
    this.chatLoader = true;
    this.chartOptions = {
      series: [this.timeLeft * 1.7],
      chart: {
        height: 150,
        type: "radialBar",
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 56,
              fontSize: "22px",
              color: undefined,

              formatter: function (val) {
                return  Math.round(val / 1.7) + "sec";
              }
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 30, 60]
        }
      },
      stroke: {
        dashArray: 2
      },
      labels: [""]
    };
  }
  optSend:boolean = false
  resetPasswordUser() {
    console.log(this.resetPassword.value);
    this.verify = 'otpVerify'

  }

  optFormUser(){

  }

  otpChecked: any;
  otpBtn: boolean = false
  

  optCheck(value) {
    if (this.otpChecked.length == '5') {
      let regex = "^[0-9]*$"
      let a = this.otpChecked.match(regex)
      if (a != null) {
        console.log(this.otpChecked);
        this.otpBtn = true

      } else {
        this.otpBtn = true
        return

      }




      this.otpBtn = true
    } else {
      this.otpBtn = false
      return
    }



  }


  sendOtpCount:number = 0
  otpVerifyUser() {
    // this.verify = 'passVerify'
    this.optSend = true

    setTimeout(() => {
      this.optSend = false
      if(this.sendOtpCount  == 3){
    this.verify = 'passVerify'

      }
      this.sendOtpCount++
      

    }, 10000);
  }

  resendOTP(){
    
  }


  obsTimer: number = 0;
  sourceSubscribe: Subscription;
  counterReset = 60000;
  timerStart(data) {

    this.currTime = timer(1000, 1000).subscribe(() => (this.obsTimer = this.obsTimer - 1000))
    this.sourceSubscribe = timer(data, 60000).subscribe((val) => {
      this.obsTimer = this.counterReset;

    });

  }
  StartBtn(data) {
    this.timerStart(this.obsTimer)

  }
  pauseBtn() {

    this.currTime ? this.currTime.unsubscribe() : '';
  }




  hostChartView: any = []
  time: number = 0;
  display;
  counter = timer(0, 1000);
  public clock;


  makeData() { }





}
