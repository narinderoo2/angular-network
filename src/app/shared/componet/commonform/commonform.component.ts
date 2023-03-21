import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subscription } from 'rxjs';
import { CommonApiServiceService } from '../../services/common-api-service.service';
import { EndPointService } from '../../services/end-point.service';
import { ErrorsMessagesService } from '../../services/errors-messages.service';

@Component({
  selector: 'app-commonform',
  templateUrl: './commonform.component.html',
  styleUrls: ['./commonform.component.scss']
})
export class CommonformComponent implements OnInit {

  @Input() inputForm: {
    allFrom: any,
    componetName: string,
    submitForm: any
  }
  @Output() outPutData: EventEmitter<any> = new EventEmitter();
  @ViewChild('openFormPopUp', { static: false }) openFormPopUp: ElementRef;

  modalReference$: any
  editFormPatchValue: any = null
  tabName: string;
  formDetails: any;
  submitFormDetails: any;
  errorMessages: any;
  dynamicForm: FormGroup;

  dropListingSubscribe$: Subscription
  createSubscribtion$: Subscription

  dropDownQueryParam: Object = {
    Role: '?filter=role'
  }


  spinnerWorking: boolean = false


  constructor(
    private _ems: ErrorsMessagesService,
    private _modalService: NgbModal,
    private _commonService: CommonApiServiceService,
    private _endpoints: EndPointService,


  ) { }

  ngOnInit(): void {
    this.tabName = this.inputForm.componetName
    this.formDetails = this.inputForm.allFrom
    this.submitFormDetails = this.inputForm.submitForm
    console.log(this.inputForm);
    this.errorMessages = this._ems[this.tabName];
  }

  // First html load (life hook)
  ngAfterViewInit() {
    this.formControlAdd();
    this.openPopUp();
  }

  openPopUp() {
    this.formDetails.forEach(item => {
      if (item.endPoint) {
        this.getDropDownListing(item)
      }
    })

    console.log(this.formDetails);
    
    this.modalReference$ = this._modalService.open(this.openFormPopUp, {
      size:this.formDetails.length >1 ?'lg':'md',
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'm-content ',
    });
    this.modalReference$.result.then(
      (result) => { },
      (reason) => {
        console.log('X')

        this.outPutData.emit({ "formData": this.formDetails })
      })
  }

  // Dyanamic dropdown api hit only one time 
  getDropDownListing(item) {
    if (item.dropDownListing && item.dropDownListing.length > 0) {
      return
    }
    let a = item.endPoint
    this.dropListingSubscribe$ = this._commonService.getRequest
      (this._endpoints[a] + this.dropDownQueryParam[item.label]).subscribe({
        next: (res) => {
          item.dropDownListing = []
          if (res.resCode == '1') {
            item.dropDownListing = [...res.result]
          } else {
          }
        },
        error: (error) => {
          this._commonService.callAlert()

        }
      })


  }

  // Dyanamic Multiple Form Control create with and without validations
  formControlAdd() {
    let group = {}
    this.formDetails.forEach(item => {
      console.log(item);
      group[item.formControl] = new FormControl(null, item.validation ? [Validators.required, Validators.minLength(item.min), Validators.maxLength(item.max)] : [])
    })
    this.dynamicForm = new FormGroup(group)
  }

  createForm() {
    if (this.dynamicForm.invalid) {
      return
    }
    this.spinnerWorking = true
    let data = this.dynamicForm.value
    let method = ''
    let urlEndPoint = ''
    let formData = this._commonService.createFormData(data, this.submitFormDetails)
    if (this.submitFormDetails.type == 'update') {
      method = 'Patch'
    } else {
      method = 'POST'
      urlEndPoint = this._endpoints[this.submitFormDetails.endPoint]

    }

    console.log(this.editFormPatchValue, urlEndPoint);


    this.createSubscribtion$ = this._commonService
      .commonRequest(method, urlEndPoint, formData)
      .pipe(debounceTime(500))
      .subscribe({
        next:
          (resp) => {
            this.spinnerWorking = false
            if (resp.resCode == "1") {
              this.modalReference$.close()
              this._commonService.callAlert('', resp.message, 'success')
              this.outPutData.emit({ "formData": this.formDetails,call:'listing' })
            } else {
              this._commonService.callAlert('', resp.message, 'error')
            }

          },
        error: (error) => {
          this.spinnerWorking = false
          this._commonService.callAlert()

        }
      })


  }

  resetForm() {

    this.dynamicForm.reset()

  }

}
