import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { debounceTime, Subscription } from 'rxjs';
import { CommonApiServiceService } from 'src/app/shared/services/common-api-service.service';
import { CommonhelperService } from 'src/app/shared/services/commonhelper.service';
import { EndPointService } from 'src/app/shared/services/end-point.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorsMessagesService } from 'src/app/shared/services/errors-messages.service';

export interface tableListing {
  id: string;
  name: string;
  created_by: string;
  description: string

}


@Component({
  selector: 'app-regionmanagement',
  templateUrl: './regionmanagement.component.html',
  styleUrls: ['./regionmanagement.component.scss']
})


export class RegionmanagementComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  listSubscribtion$: Subscription;
  CreateSubscribtion$: Subscription;

  pageRecordsTotal: number = 0;
  page: number = 1;
  size: number = 5;
  search: string = '';
  ordering: string = '-id';
  URLSearchParams: any;



  countryRow: any;
  deletePopData: any = { name: 'city', url: this.endpoints, confirmParms: '' }




  rowDataTable: tableListing[] = [] // table listing data with interface 
  endPointChange: string = ''    // api end point 
  getTableData: boolean = false  // table show and hide 
  dynamicForm: FormGroup;
  modalReference$: any;
  formOpen: boolean = false;
  deletepopUp: boolean = false;
  spinnerWorking: boolean = false;
  createFormEndPoints: string;
  dropDownListing: any;

  cities: any = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys', disabled: true },
    { id: 4, name: 'Pabradė' },
    { id: 5, name: 'Klaipėda' }
  ];

  countryListing: any = []
  stateListing: any = []
  countryForm: any = [
    {
      label: 'Country Name', formControl: 'name', type: 'input', placeholder: 'Please enter country name',
      validation: true, min: 3, max: 50, regex: 'alphanumericDashUnderScore'
    },
    {
      label: 'Description', formControl: 'description', type: 'input', placeholder: 'Please enter description',
      validation: true, min: 3, max: 50, regex: 'alphanumericDashUnderScore'
    },
  ]
  stateForm: any = [
    {
      label: 'Country Name', formControl: 'countryId', type: 'dropdown', placeholder: 'Please select country name',
      validation: true, dropDownListing: this.stateListing, endPoint: 'CREATE_COUNTRY'
    },
    {
      label: 'State Name', formControl: 'name', type: 'input', placeholder: 'Please enter state name',
      validation: true, min: 3, max: 50, regex: 'alphanumericDashUnderScore'
    },
  ]
  cityForm: any = [
    {
      label: 'Country Name', formControl: 'country', type: 'dropdown', placeholder: 'Please select country name',
      validation: true, dropDownListing: this.countryListing, endPoint: 'CREATE_COUNTRY'
    },
    {
      label: 'State Name', formControl: 'state', type: 'dropdown', placeholder: 'Please select state name',
      validation: true, dropDownListing: this.stateListing,endPoint: 'CREATE_STATE'
    },
    {
      label: 'City Name', formControl: 'name', type: 'input', placeholder: 'Please enter city name',
      validation: true, min: 3, max: 50, regex: 'alphanumericDashUnderScore'
    },
    {
      label: 'Latitude', formControl: 'latitude', type: 'input', placeholder: 'Please enter latitude',
      validation: false, min: 3, max: 50, regex: 'latitude'
    },
    {
      label: 'Longitude', formControl: 'longitude', type: 'input', placeholder: 'Please enter longitude',
      validation: false, min: 3, max: 50, regex: 'longitude'
    },
  ]
  formDetails: any;

  errorMessages: any = []  // form type of error 
  tabChangeValue: any;  // tab change condition 



  constructor(
    private commonHelperservice: CommonhelperService,
    private commonService: CommonApiServiceService,
    private endpoints: EndPointService,
    private _ems: ErrorsMessagesService,
    private modalService: NgbModal,

  ) {

  }

  ngOnInit(): void {
    this.errorMessages = this._ems.regionManagement;
    this.changeTab()
  }

  formControlAdd() {
    let group = {}
    this.formDetails.forEach(item => {
      group[item.formControl] = new FormControl(null, item.validation ? [Validators.required, Validators.minLength(item.min), Validators.maxLength(item.max)] : [])

    })
    this.dynamicForm = new FormGroup(group)
  }




  tabName: string = ''
  changeTab(tabName: string = "Country", tabSelect: any = null) {
    this.tabName = tabName
    this.getTableData = false
    this.tabChangeValue = tabSelect


    
    if (tabName == 'Country') {
      this.formDetails = this.countryForm
      this.endPointChange = this.endpoints.GET_REGION
      this.countryRow = [
      { orderable: true, data: 'name', headerName: 'Name' },
      { orderable: true, data: 'description', headerName: 'Description' },
      { orderable: true, data: 'created_by', headerName: 'Created By' },
      { orderable: false, data: 'action', headerName: 'Action' },
      ]

    } else if (tabName == 'State') {
      this.formDetails = this.stateForm
      this.endPointChange = this.endpoints.GET_REGION_STATE

      this.countryRow = [
        { orderable: true, data: 'country_name', headerName: 'Country Name' },
        { orderable: true, data: 'name', headerName: 'State Name' },
        { orderable: true, data: 'createdBy', headerName: 'Created By' },
        { orderable: false, data: 'action', headerName: 'Action' },
      ]

    } else {
      this.formDetails = this.cityForm
      this.endPointChange = this.endpoints.GET_REGION_CITY

      this.countryRow = [
        { orderable: true, data: 'country_name', headerName: 'Country Name' },
        { orderable: true, data: 'state_name', headerName: 'State Name' },
        { orderable: true, data: 'name', headerName: 'City Name' },
        { orderable: true, data: 'latitude', headerName: 'Latitude' },
        { orderable: true, data: 'longitude', headerName: 'Longitude' },
        { orderable: false, data: 'action', headerName: 'Action' },
      ]

    }

    setTimeout(() => {
      this.getUserList()

    }, 10);

  }



  openPopUp(content, tag) {
    this.formControlAdd() ;
    this.formDetails.forEach(item => {
      if (item && item.type == "dropdown") {
          this.getDropDownListing(item)
      }
    })

    if(tag){
      this.dynamicForm.patchValue(tag)
    }

    console.log(tag,this.dynamicForm.value);
    

    //   this.getDropDownListing(this.stateListing)


    // if (this.tabName == 'Country') {
    //   this.createFormEndPoints = this.endpoints.CREATE_COUNTRY

    // } else if (this.tabName == 'State') {
    //   this.createFormEndPoints = this.endpoints.CREATE_STATE
    //   this.getDropDownListing(this.stateListing)
    // } else {
    //   this.createFormEndPoints = this.endpoints.CREATE_STATE

    // }



    this.modalReference$ = this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'm-content ',
    });
    this.formOpen = true;
    return
  }








  dropListingSubscribe$: Subscription;
  getDropDownListing(saveLisiting: any) {
    if(saveLisiting.dropDownListing.length >0){
      return
    }
    let a = saveLisiting.endPoint
    this.dropListingSubscribe$ = this.commonService.getRequest
      (this.endpoints[a]).subscribe({
        next: (res) => {
          saveLisiting.dropDownListing = []
          if (res.resCode == '1') {
            saveLisiting.dropDownListing = [...res.result]
          } else {
          }
        },
        error: (error) => {
          this.commonService.callAlert()

        }
      })
  }



  reDraw(): void {
    if (this.datatableElement) {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
    }
  }

  getUserList() {
    // this.userDataTable = [];
    this.getTableData = true
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
        // return
        this.listSubscribtion$ = this.commonService
          .getRequest(this.endPointChange + '?' + params)
          .pipe(debounceTime(500))
          .subscribe({

            next:
              (resp) => {
                this.rowDataTable = [];

                if (resp) {

                  this.rowDataTable = resp.results


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
                  this.rowDataTable = [];
                }
              },
            error: (error) => {
              // this.commonService.callAlert();
              callback({
                recordsTotal: 0,
                recordsFiltered: 0,
                data: [],
              });
              this.rowDataTable = [];
            }
          }
          );
      },
      columns: [...this.countryRow]
    };
  }


  resetForm() {
    this.dynamicForm.reset()
  }
  createForm() {
    if (this.dynamicForm.invalid) {
      return
    }

    this.spinnerWorking = true
    let data = this.dynamicForm.value
    // CREATE_COUNTRY country-create

    let formData = this.commonService.createFormData(data)


    if (this.tabName == 'Country') {
     
      this.createFormEndPoints = this.endpoints.CREATE_COUNTRY

    } else if (this.tabName == 'State') {
    
      this.createFormEndPoints = this.endpoints.CREATE_STATE
    } else {
      
      this.createFormEndPoints = this.endpoints.CREATE_CITY

    }



    this.CreateSubscribtion$ = this.commonService
      .postRequest(this.createFormEndPoints, formData)
      .pipe(debounceTime(500))
      .subscribe({
        next:
          (resp) => {
            this.spinnerWorking = false

            if (resp.resCode == "1") {
              this.getUserList()
            } else {
              this.commonService.callAlert('', resp.message, 'error')
            }

          },
        error: (error) => {
          this.spinnerWorking = false

          this.commonService.callAlert()

        }
      })

  }

  outPutDelete(data) {
    if (data) {
      this.deletepopUp = false
      this.getUserList()
    }

  }
  openPopupDelete(data) {

    this.deletepopUp = true

  }

 
}
