import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};





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
  chatLoader: boolean=false;


  verify: string = 'verify';

  couter: any;
  constructor(
    private fb: FormBuilder
  ) {

    this.resetPassword = this.fb.group({
      email: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.verify = ''
    this.timerStart(0)
    this.apexCounterChart()

  }

  resetPasswordUser() {
    console.log(this.resetPassword.value);
    this.verify = 'otpVerify'

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


  otpVerifyUser() {
    this.verify = 'passVerify'
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
 

apexCounterChart(){
  this.chatLoader=true;
  this.chartOptions = {
    series: [67],
    chart: {
      height: 350,
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
            offsetY: 76,
            fontSize: "22px",
            color: undefined,
            formatter: function(val) {
              return val + "%";
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
        stops: [0, 50, 65, 91]
      }
    },
    stroke: {
      dashArray: 4
    },
    labels: ["Median Ratio"]
  };

}





}
