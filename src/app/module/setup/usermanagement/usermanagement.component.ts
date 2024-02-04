import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { debounceTime, filter, Subscription } from 'rxjs';
import { CommonApiServiceService } from 'src/app/shared/services/common-api-service.service';
import { CommonhelperService } from 'src/app/shared/services/commonhelper.service';
import { EndPointService } from 'src/app/shared/services/end-point.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ErrorsMessagesService } from 'src/app/shared/services/errors-messages.service';
import { CustomValidaionService } from 'src/app/shared/services/custom-validaion.service';
import { CommonServiceService } from 'src/app/shared/services/common-service.service';
import { PrimeNGConfig } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Table } from 'primeng/table';


export interface Customer {
  id?: number;
  name?: number;
  country?: any;
  company?: string;
  date?: string;
  status?: string;
  representative?: any;
}


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

  userForm: UntypedFormGroup;

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
  dataHsi: boolean = false

  countryCodeData: string = '91';
  ordering: string = '-id';


  roleDropDown:any=[
    {role:"Orgnization Admin",id:1},
    {role:"User",id:2},
    {role:"Viewer",id:3}
  ]

  userFormData = [
    // {
    //   label: 'Country Name', formControl: 'countryId', type: 'dropdown', placeholder: 'Please select country name',
    //   validation: true, dropDownListing:[], endPoint: 'CREATE_COUNTRY'
    // },
    {
      label: 'First Name', formControl: 'first_name', type: 'input', placeholder: 'Please enter first name',
      validation: true, min: 3, max: 50, regex: 'alphanumericDashUnderScore'
    },
    {
      label: 'Last Name', formControl: 'last_name', type: 'input', placeholder: 'Please enter last name',
      validation: false, min: 3, max: 50
    },
    {
      label: 'Email', formControl: 'email', type: 'input', placeholder: 'Please enter email',
      validation: true, min: 3, max: 100
    },
    {
      label: 'Password', formControl: 'password', type: 'input', placeholder: 'Please enter password',
      validation: true, min: 3, max: 30
    },
    {
      label: 'Confirm Password', formControl: 'confirmPassword', type: 'input', placeholder: 'Please enter confirm password',
      validation: true, min: 3, max: 30
    },
    {
      label: 'Phone', formControl: 'phone', type: 'number', placeholder: 'Please enter phone number',
      validation: false, min: 3, max: 15
    },
  ]


  withoutFullScreen = [
    { field: 'host_ip',  header: 'IP Address', sortable: true, width: '150px' },
    { field: 'host_group',  header: 'Host Group', sortable: true, width: '150px' },
    { field: 'monitoring_period',  header: 'Monitoring Period', sortable: true, width: '200px' },
    { field: 'vendor',  header: 'Vendor', sortable: true, width: '150px' },
    { field: 'monitoring_instance',  header: 'Monitoring Instance', sortable: true, width: '200px' },
    { field: 'state_count', header: 'Region', sortable: true, width: '150px' }
  ]


  

  ngprimeMenuOptions:any = this.commonHelperservice.ngprimeMenuOptions



  constructor(
    private commonHelperservice: CommonhelperService,
    private commonService: CommonApiServiceService,
    private commonserviceService: CommonServiceService,
    private endpoints: EndPointService,
    private modalService: NgbModal,
    private _form: UntypedFormBuilder,
    private ems: ErrorsMessagesService,
    private primengConfig: PrimeNGConfig,
    private http: HttpClient,

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
    return (formGroup: UntypedFormGroup) => {
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

 
customerServiceData:any = {"customers":[{"id":1020,"name":"Bette Nicka","country":{"name":"Paraguay","code":"py"},"company":"Sport En Art","date":"2016-10-21","status":"renewal","verified":false,"activity":100,"representative":{"name":"Onyama Limba","image":"onyamalimba.png"},"balance":4609},{"id":1021,"name":"Veronika Inouye","country":{"name":"Ecuador","code":"ec"},"company":"C 4 Network Inc","date":"2017-03-24","status":"renewal","verified":false,"activity":72,"representative":{"name":"Ioni Bowcher","image":"ionibowcher.png"},"balance":26565},{"id":1022,"name":"Willard Kolmetz","country":{"name":"Tunisia","code":"tn"},"company":"Ingalls, Donald R Esq","date":"2017-04-15","status":"renewal","verified":true,"activity":94,"representative":{"name":"Asiya Javayant","image":"asiyajavayant.png"},"balance":75876},{"id":1023,"name":"Maryann Royster","country":{"name":"Belarus","code":"by"},"company":"Franklin, Peter L Esq","date":"2017-03-11","status":"qualified","verified":false,"activity":56,"representative":{"name":"Elwin Sharvill","image":"elwinsharvill.png"},"balance":41121},{"id":1024,"name":"Alisha Slusarski","country":{"name":"Iceland","code":"is"},"company":"Wtlz Power 107 Fm","date":"2018-03-27","status":"qualified","verified":true,"activity":7,"representative":{"name":"Stephen Shaw","image":"stephenshaw.png"},"balance":91691},{"id":1025,"name":"Allene Iturbide","country":{"name":"Italy","code":"it"},"company":"Ledecky, David Esq","date":"2016-02-20","status":"qualified","verified":true,"activity":1,"representative":{"name":"Ivan Magalhaes","image":"ivanmagalhaes.png"},"balance":40137},{"id":1026,"name":"Chanel Caudy","country":{"name":"Argentina","code":"ar"},"company":"Professional Image Inc","date":"2018-06-24","status":"new","verified":true,"activity":26,"representative":{"name":"Ioni Bowcher","image":"ionibowcher.png"},"balance":21304},{"id":1027,"name":"Ezekiel Chui","country":{"name":"Ireland","code":"ie"},"company":"Sider, Donald C Esq","date":"2016-09-24","status":"new","verified":false,"activity":76,"representative":{"name":"Amy Elsner","image":"amyelsner.png"},"balance":60454},{"id":1028,"name":"Willow Kusko","country":{"name":"Romania","code":"ro"},"company":"U Pull It","date":"2020-04-11","status":"qualified","verified":true,"activity":7,"representative":{"name":"Onyama Limba","image":"onyamalimba.png"},"balance":17565},{"id":1029,"name":"Bernardo Figeroa","country":{"name":"Israel","code":"il"},"company":"Clark, Richard Cpa","date":"2018-04-11","status":"renewal","verified":true,"activity":81,"representative":{"name":"Ioni Bowcher","image":"ionibowcher.png"},"balance":17774}],"totalRecords":200}
datasource: Customer[];
@ViewChild('dt') table: Table;

selectedColumns = [];
dialogVisible: boolean=true


customers: Customer[];
totalRecords: number;
cols: any[];
loading: boolean;
representatives: any;
selectAll: boolean = true;
selectedCustomers: Customer[];


  ngOnInit(): void {


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



// this.customerService.getCustomersLarge().then(data => {
  // this.datasource = this.customerServiceData.customers;
  // this.totalRecords = this.customerServiceData.length;
// });
this.cols = [
  { field: 'description', header: 'Country',sortable: true },
  { field: 'name', header: 'Name',sortable: true },
  { field: 'id', header: 'Company',sortable: true },
  { field: 'state_count', header: 'Representative',sortable: false }
];
this.loading = true;
// this.primengConfig.ripple = true;
this.selectedColumns = this.cols


  }


  getCustomersLarge(tag=null) {
    console.log(tag);
    
    return this.http.get<any>(`http://127.0.0.1:8000/region/country-pagination/?${tag?.toString()}`)
        .toPromise()
        .then(res => <Customer[]>res)
        .then(data => { return data; });
}



loadCustomers(event: LazyLoadEvent) {
  this.loading = true;
  console.log('lazyloading ');
  

  // setTimeout(() => {

    console.log(event,'event==============',event.globalFilter?.value);

    let fitler:any={
      page:event.first/event.rows +1 ,
      size:event.rows ,
      search:event.globalFilter?.value
    }
    let filterData = {}

    for (let row in fitler){
if(fitler[row]){
  filterData[row] = fitler[row]
}
    }

    const searchParams = new URLSearchParams(filterData);
    this.commonService.getRequest(`http://127.0.0.1:8000/region/country-pagination/?${searchParams?.toString()}`)
    

    .pipe(debounceTime(500))
          .subscribe({

            next:
              (resp) => {
                console.log(resp);
                this.customers = resp.results;
                    this.totalRecords = resp.count;
                    this.loading = false;
              },
            error: (error) => {
              this.userLoaderData = false;
              // this.commonService.callAlert();
             
              this.userDataTable = [];
            }


    
    
    // .subscribe(item => {
    
    })

    
      // this.getCustomersLarge(searchParams).then((res:any) => {

      //   console.log(res,'==================');
        

          
      // })
  // }, 1000);
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
        // return
        this.userListSubscribtion$ = this.commonService
          .getRequest(this.endpoints.GET_USER_PAGINATION + '?' + params)
          .pipe(debounceTime(500))
          .subscribe({

            next:
              (resp) => {
                this.userLoaderData = false;

                if (resp) {
                  //.resultCode === '1'


                  this.userDataTable = resp.results
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

    // let formData = 

    let formData =this.commonService.createFormData({
      first_name:data.first_name,
      last_name:data.last_name,
      email:data.email,
      username:data.first_name,
      phone_number:data.phone_number,
      flag:data.country_code,
      // role:data.role,
      user_timezone:data.timeZone,
      password:data.userPassword,
      // confirmPassword:data.confirmPassword
      
    });

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
