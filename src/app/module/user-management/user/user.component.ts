import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { debounceTime, Subscription } from 'rxjs';
import { CommonApiServiceService } from 'src/app/shared/services/common-api-service.service';
import { CommonhelperService } from 'src/app/shared/services/commonhelper.service';
import { EndPointService } from 'src/app/shared/services/end-point.service';
import { CustomValidaionService } from 'src/app/shared/services/custom-validaion.service';
import { ErrorsMessagesService } from 'src/app/shared/services/errors-messages.service';


import { PrimeNGConfig } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userListSubscribtion$: Subscription;
  countryCodeSubscription$: Subscription;
  timeZoneSubscription$: Subscription;
  creataDataSubscrption$: Subscription;

  spinnerWorking: boolean = false
  userForm: FormGroup;
  modalReference: any;
  errorMessages: any;
  countryCodeData: string = '91';

  countryList:any=[]
  roleDropDown:any=[]
  passwordShow:boolean = false
  passwordShowTwo:boolean = false
  timeZone: any;


  loading:boolean = false
  columnAdjust:boolean = false
  userListingData:any = []
  totalRecords:number = 0
  ngprimeMenuOptions:any = this._commonHelperservice.ngprimeMenuOptions
  selectedColumns:any = []
  columns:any = []
  paramterSave:string=''


  constructor(
    private _commonHelperservice: CommonhelperService,
    private _commonService: CommonApiServiceService,
    private _endpoints: EndPointService,
    private _modalService: NgbModal,
    private _form: FormBuilder,
    private _ems: ErrorsMessagesService,

  ) { 
    this.userForm = this._form.group({

      first_name: ['',[Validators.required, Validators.pattern('^[a-zA-Z]{2,15}$')]],
      last_name: '',
      email: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required,CustomValidaionService.passwordCheck]],
      confirmPassword: ['', Validators.required],
      phone_number: [''],
      country_code: ['', Validators.required],
      role: [null, Validators.required],
      timeZoneDropDown: [null],
    },
    {
      validator:UserComponent.confirmedValidator(
        'userPassword',
        'confirmPassword'
      ),
    })
  }

  static confirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  ngOnInit(): void {
    this.errorMessages = this._ems.userManagementErrorMessages;
    this.columns = [
      { field: 'first_name', header: 'Name',sortable: true },
      { field: 'email', header: 'Email',sortable: true },
      { field: 'group_name', header: 'Role',sortable: true },
      { field: 'create_at', header: 'Create At',sortable: false },
      { field: 'state_count', header: 'Status',sortable: false },
      { field: 'state_count', header: 'Action',sortable: false }
    ];

    this.selectedColumns = this.columns

    this.timeZoneSubscription$ = this._commonService.getRequest('assets/data/timeZone.json').subscribe((res) => {
      this.timeZone = res
    })
    this.countryCodeSubscription$ = this._commonService.getRequest('assets/data/countrycode.json').subscribe((res) => {
      this.countryList = res.map((item) => [
        item[0].replace(/ *\([^)]*\) */g, ''),
        item[1],
        item[2],
      ]);
      
    })


   
    this.columnAdjust = true
  }


 


  hostListing(event: LazyLoadEvent=null) {
    let data:string=''
    if(!event){
      data = this.paramterSave
    }else{
      this.paramterSave = ''
      data= this._commonHelperservice.primeNgServerTable(event,'id')
      data = data?.toString()
      this.paramterSave = data
    }
    this.loading = true;
    this._commonService.getRequest(this._endpoints.GET_USER_PAGINATION+`?${data}`)
      .pipe(debounceTime(500))
            .subscribe({
              next:
                (resp) => {
                  console.log(resp);
                  this.userListingData = resp.results;
                      this.totalRecords = resp.count;
                      this.loading = false;
                },
              error: (error) => {
                this.userListingData = [];
              }
   
      })
  }

  countryCode(event){
    setTimeout(() => {
      var e: any = document.getElementById('dialCodeData')
      this.countryCodeData = e.getElementsByClassName('getAtr')[0].getAttribute('dailCode');
    }, 500);
  }

  async getGroupListing(){
    // this.spinnerWorking = true
    if(this.roleDropDown.length == 0){
     let apiData:any =  await this._commonService.getDropDownData(this._endpoints.GET_DROP_DOWN_LISTING+'?filter=group')     
     if(apiData){
        this.roleDropDown = apiData  
     }
    }
    // this.spinnerWorking = false
  }

  openPopUp(content, tag) {
    this.getGroupListing()


    this.modalReference = this._modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'm-content ',
    });
  }

  createNewUser(){
    let data = this.userForm.value
    console.log(data);
    
    if (this.userForm.invalid) {
      return;
    }
    this.spinnerWorking = true;
    let formData =this._commonService.createFormData({
      first_name:data.first_name,
      last_name:data.last_name,
      email:data.email,
      username:data.first_name,
      phone_number:data.phone_number,
      flag:data.country_code,
      group:data.role,
      user_timezone:data.timeZone,
      password:data.userPassword,      
    });

    this.creataDataSubscrption$ = this._commonService
      .postRequest( this._endpoints.USER_CREATE, formData)
      .subscribe({
        next: 
        (response) => {
          this.spinnerWorking = false;

          if (response.resultCode == '1') {
            this.modalReference ? this.modalReference.close() : '';
            this._commonService.callAlert( '',
              response.resultDescription, 'success');
              this.hostListing()
          } else {
            this._commonService.callAlert( '',
              response.errorMessage, 'error' );
          }
        },
       error: (error) => {
          this._commonService.callAlert();
          this.spinnerWorking = false;
        }}
      );




  }



  editUser(row){
    
  }
  deleteUser(row){

  }






}
