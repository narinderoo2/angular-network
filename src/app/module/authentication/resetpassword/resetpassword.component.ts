import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { ErrorsMessagesService } from 'src/app/shared/services/errors-messages.service';
import { CommonApiServiceService } from 'src/app/shared/services/common-api-service.service';
import { EndPointService } from 'src/app/shared/services/end-point.service';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';
import { CustomValidaionService } from 'src/app/shared/services/custom-validaion.service';
import { CommonConstants } from 'src/app/shared/constant/common.constant';

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

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @ViewChild('aForm') aForm: ElementRef;

  public chartOptions: Partial<ChartOptions>;

  countDown: Subscription;
  currTime: Subscription;
  sourceSubscribe: Subscription;
  createSubscribtion$: Subscription;
  formChangeSubscribtion$: Subscription;

  resetPassword: UntypedFormGroup
  optForm: UntypedFormGroup
  forgetPassword: UntypedFormGroup

  errorMessages: any;
  interval: any;
  hostChartView: any = []
  otpFormValue: any = []

  timeLeft: number = 120;
  sendOtpCount: number = 0

  verify: string = 'emailVerify';

  chartShow: boolean = false;
  optSend: boolean = false
  spinnerWorking: boolean = false
  otpResetInput: boolean = false;
  isChangeDetect: boolean = false
  commonconstants = CommonConstants;


  constructor(
    private fb: UntypedFormBuilder,
    private _ems: ErrorsMessagesService,
    private commonService: CommonApiServiceService,
    private endpoint: EndPointService,
    private commonservice: CommonServiceService,
  ) {

    this.resetPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]]
    })


    this.optForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.minLength(5)]]
    })
    this.forgetPassword = this.fb.group(
      {
        password: ['', [Validators.required, CustomValidaionService.passwordCheck]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validator: CustomValidaionService.confirmedValidator(
          'password',
          'confirmPassword'
        ),
      }
    )
  }

  ngOnInit(): void {
    this.errorMessages = this._ems.forgetPassowrd;
    // this.verify = 'passVerify'
  }

  // Verify email 
  resetPasswordUser() {
    if (this.resetPassword.invalid) {
      return
    }
    this.spinnerWorking = true
    let formData = this.commonService.createFormData({
      email: this.resetPassword.value.email
    })
    this.createSubscribtion$ = this.commonService
      .postRequest(this.endpoint.LOGIN_EMAIL_CHECK, formData)
      .pipe(debounceTime(500))
      .subscribe({
        next:
          (resp) => {
            if (resp && resp.resultCode == '1') {
              this.verify = 'otpVerify'
              this.commonService.callAlert('', resp.errorMessage, 'success')
              this.startTimer()
              this.apexCounterChart()
              this.optForm.patchValue({
                email: this.resetPassword.value.email
              })
            } else {
              this.commonService.callAlert('', resp.errorMessage, 'error')
            }
            this.spinnerWorking = false

          },
        error: (error) => {
          this.spinnerWorking = false
          this.commonService.callAlert()

        }
      })


  }

  // Verify OTP
  otpVerifyUser() {
    if (!this.optForm.valid) {
      return
    }
    this.spinnerWorking = true
    let formData = this.commonService.createFormData(this.optForm.value)
    this.createSubscribtion$ = this.commonService
      .postRequest(this.endpoint.LOGIN_OTP_VERIFY, formData)
      .pipe(debounceTime(500))
      .subscribe({
        next:
          (resp) => {
            if (resp && resp.resultCode == '1') {
              this.verify = 'passVerify'
              // this.forgetPassword.patchValue({
              //   email: this.resetPassword.value.email
              // })
              this.onChangeDetect(this.forgetPassword)
              this.commonService.callAlert('', resp.errorMessage, 'success')
            } else {
              this.otpReset()
              this.commonService.callAlert('', resp.errorMessage, 'error')
            }
            this.spinnerWorking = false

          },
        error: (error) => {
          this.spinnerWorking = false
          this.commonService.callAlert()

        }
      })

  }

  // Verify Confiorm Password 
  confiormPassword() {
    if (!this.forgetPassword.valid || !this.optForm.valid) {
      return
    }
    this.spinnerWorking = true
    let formData = this.commonService.createFormData({
      otp:this.optForm.value.otp,
      email:this.optForm.value.email,
      password:this.forgetPassword.value.password,
      confirmPassword:this.forgetPassword.value.confirmPassword

    })
    this.createSubscribtion$ = this.commonService
      .commonRequest('Patch',this.endpoint.LOGIN_OTP_VERIFY, formData)
      .pipe(debounceTime(500))
      .subscribe({
        next:
          (resp) => {
            if (resp && resp.resultCode == '1') {
              this.commonService.callAlert('', resp.errorMessage, 'success')
              return this.commonservice.routerNavigate('/login')
            } else {
              this.resetForm()
              this.commonService.callAlert('', resp.errorMessage, 'error')
            }
            this.spinnerWorking = false
          },
        error: (error) => {
          this.spinnerWorking = false
          this.commonService.callAlert()

        }
      })

  }













  // Timer start on apex chart
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.chartOptions.series = [this.timeLeft * 100 / 120]
      } else {
        this.pauseTimer()
        this.timeLeft = 120;
        this.chartShow = false;
        this.sendOtpCount++
        this.optSend = true
        this.otpReset()


      }
    }, 1000)
  }

  //  Timer interval stop
  pauseTimer() {
    clearInterval(this.interval);
  }

  //  otp multiple input field reset 
  otpReset() {
    this.otpResetInput = true;
    setTimeout(() => {
      this.otpResetInput = false;
      this.optForm.patchValue({
        otp: ''
      })
      this.otpFormValue = []
    }, 10);
  }

  // Password reset
  resetForm() {
    this.forgetPassword.patchValue({
      password: null,
      confirmPassword: null
    })
    this.isChangeDetect = false;
  }

  // Form value detect
  onChangeDetect(form: any) {
    this.formChangeSubscribtion$ = form.valueChanges.subscribe((val) => {
      if (val) {
        this.isChangeDetect = true
      }
    })
  }


  // OTP send on same email
  resendOTP() {
    if (!this.optSend) {
      return
    }
    if (this.sendOtpCount == 3) {
      return this.commonservice.routerNavigate('/login')
    }
    this.resetPasswordUser()
  }


  // Multi input field data push in array and splice
  changeValueOTP(event, index) {
    let data = event.target.value
    if (data) {
      this.setFocus(index + 1)
      this.otpFormValue.splice(index, 0, data)
    } else {
      this.otpFormValue.splice(index, 1)
    }

    this.optForm.patchValue({
      otp: this.otpFormValue.join('')
    })
  }

  // Apex chart show for otp 2 min timer
  apexCounterChart() {
    this.chartShow = true;
    this.chartOptions = {
      series: [this.timeLeft * 100 / 120],
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

                return Math.round(val * 120 / 100) + "sec";
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


  // Auto next input select  (focus change)
  setFocus(name) {
    const ele = this.aForm.nativeElement[name];
    if (ele) {
      ele.focus();
    }
  }

  // Auto input create 
  counterData(i: number) {
    return new Array(i);
  }

}
