import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { debounceTime, Subscription } from 'rxjs';
import { CommonApiServiceService } from 'src/app/shared/services/common-api-service.service';
import { CommonhelperService } from 'src/app/shared/services/commonhelper.service';
import { EndPointService } from 'src/app/shared/services/end-point.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorsMessagesService } from 'src/app/shared/services/errors-messages.service';
import { CustomValidaionService } from 'src/app/shared/services/custom-validaion.service';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})
export class UsermanagementComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  userListSubscribtion$: Subscription;
  timeZoneSubscription$: Subscription;
  countryCodeSubscription$: Subscription;
  creataDataSubscrption$: Subscription;


  pageRecordsTotal: number = 0;
  page: number = 1;
  size: number = 5;
  search: string = '';

  userForm: FormGroup;

  errorMessages: any;
  timeZone: any;
  countryList: any;
  userDataTable: any = []
  URLSearchParams: any;
  public modalReference: any;


  isEditUser:boolean = false
  passwordShow:boolean = false
  passwordShowTwo:boolean = false
  userLoaderData: boolean = false

  countryCodeData: string = '91';
  ordering: string = '-id';


  roleDropDown:any=[
    {role:"Orgnization Admin",id:1},
    {role:"User",id:2},
    {role:"Viewer",id:3}
  ]



  




  constructor(private commonHelperservice: CommonhelperService,
    private commonService: CommonApiServiceService,
    private commonserviceService: CommonServiceService,
    private endpoints: EndPointService,
    private modalService: NgbModal,
    private _form: FormBuilder,
    private ems: ErrorsMessagesService,

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
      validator:UsermanagementComponent.confirmedValidator(
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





    this.userDataTable = [{ checked: false,

      firstName:'rt',
      email:"rt@gmail.com",
      role:1,
      create_at:'26-08-2022',
      is_active:true
},{ checked: false,

firstName:'rt',
email:"rt@gmail.com",
role:1,
create_at:'26-08-2022',
is_active:true
}]

    this.errorMessages = this.ems.userManagementErrorMessages;

    this.timeZoneSubscription$ = this.commonService.getRequest('assets/data/timeZone.json').subscribe((res) => {
      this.timeZone = res
      
    })
    this.countryCodeSubscription$ = this.commonService.getRequest('assets/data/countrycode.json').subscribe((res) => {
      this.countryList = res.map((item) => [
        item[0].replace(/ *\([^)]*\) */g, ''),
        item[1],
        item[2],
      ]);
      
    })
// this.userForm.reset()
this.resetForm()
this.getUserList()
  }




  reDraw(): void {
    if (this.datatableElement) {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
    }
  }



  getUserList() {
    this.userLoaderData = true;
    // this.userDataTable = [];

    this.reDraw();
    this.dtOptions = {
      ...this.commonHelperservice.settingDataTableServer(),
      ajax: (dataTablesParameters: any, callback, settings) => {
        let params;
        if (this.URLSearchParams) {
          params = new URLSearchParams(this.URLSearchParams.toString());
        } else {
          params = new URLSearchParams();
        }

        this.commonHelperservice.dataTableParams(
          params,
          dataTablesParameters,
          this.page,
          this.size,
          this.pageRecordsTotal,
          this.search,
          this.ordering
        );
        console.log(this.endpoints.USER_LISTING);
        return
        this.userListSubscribtion$ = this.commonService
          .getRequest(this.endpoints.USER_LISTING + '?' + params)
          .pipe(debounceTime(500))
          .subscribe({

            next:
              (resp) => {
                this.userLoaderData = false;

                if (resp) {
                  //.resultCode === '1'


                  // this.userDataTable = resp.results.map((data) => {
                  //   return {

                      
                  //     ...data,
                  //     checked: false,
                  //   };
                  // });

                  if (resp.count) {
                    this.pageRecordsTotal = resp.count;
                  } else {
                    this.pageRecordsTotal = 0;
                  }
                  callback({
                    recordsTotal: this.pageRecordsTotal,
                    recordsFiltered: this.pageRecordsTotal,
                    data: [],
                  });
                } else {
                  callback({
                    recordsTotal: 0,
                    recordsFiltered: 0,
                    data: [],
                  });
                  this.userDataTable = [];
                }
              },
            error: (error) => {
              this.userLoaderData = false;
              // this.commonService.callAlert();
              callback({
                recordsTotal: 0,
                recordsFiltered: 0,
                data: [],
              });
              this.userDataTable = [];
            }
          }
          );
      },
      columns: [
        { orderable: false, data: '' },
        { orderable: true, data: 'first_name' },
        { orderable: true, data: 'last_name' },
        { orderable: true, data: 'email' },
        { orderable: true, data: 'phone_number' },
        { orderable: false, data: '' },
        { orderable: false, data: 'last_login' },
        // { orderable: false, data: 'is_active' },
        // { orderable: false, data: '' },
      ],
    };
  }

  openPopUp(content, tag) {

    setTimeout(() => {
      this.userForm.controls.country_code.setValue('in');
    }, 500);

    this.modalReference = this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'm-content ',
    });
  }

  resetForm(){
    // if(this.isEditUser){
      this.commonserviceService.resetForm(this.userForm)
      console.log(this.userForm.value);
      
    // }
  }




 
  


  createNewUser(){
    let data = this.userForm.value
    console.log(data);
    
    this.userLoaderData = true;
    if (this.userForm.invalid) {
      this.commonserviceService.validateAllFields(this.userForm);
      this.userLoaderData = false;
      return;
    }


    //create a new form data
    let formData = {
      firstName:data.first_name,
      lastName:data.last_name,
      email:data.email,
      phoneNumber:data.phone_number,
      countryCode:data.country_code,
      role:data.role,
      timeZone:data.timeZone,
      userPassword:data.userPassword,
      confirmPassword:data.confirmPassword
      
    };

    this.creataDataSubscrption$ = this.commonService
      .postRequest( this.endpoints.USER_CREATE, formData)
      .subscribe({
        next: 
        (response) => {
          this.userLoaderData = false;

          if (response.resultCode == '1') {
            this.modalReference ? this.modalReference.close() : '';
            this.commonService.callAlert(
              '',
              response.resultDescription,
              'success'
            );


          } else {
            this.commonService.callAlert(
              '',
              response.errorMessage,
              'error'
            );
          }
         
        },
       error: (error) => {
          this.commonService.callAlert();
          // this.disbleDoubleClick = true;
          // this.playbookLoaderData = false;
        }}
      );




  }

  countryCode(event){

    setTimeout(() => {
      var e: any = document.getElementById('dialCodeData')
      this.countryCodeData = e.getElementsByClassName('getAtr')[0].getAttribute('dailCode');
    }, 500);
   
    
    

  }
}
