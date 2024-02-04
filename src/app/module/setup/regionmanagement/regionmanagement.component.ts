import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { debounceTime, Subscription } from 'rxjs';
import { CommonApiServiceService } from 'src/app/shared/services/common-api-service.service';
import { CommonhelperService } from 'src/app/shared/services/commonhelper.service';
import { EndPointService } from 'src/app/shared/services/end-point.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  dropListingSubscribe$: Subscription;

  pageRecordsTotal: number = 0;
  page: number = 1;
  size: number = 5;
  search: string = '';
  ordering: string = '-id';
  URLSearchParams: any;


  tabName: string = ''

  countryRow: any;
  deletePopData: any = { name:'', url: this.endpoints, confirmParms: '' }




  rowDataTable: tableListing[] = [] // table listing data with interface 
  endPointChange: string = ''    // api end point 
  getTableData: boolean = false  // table show and hide 
  dynamicForm: UntypedFormGroup;
  modalReference$: any;
  formOpen: boolean = false;
  deletepopUp: boolean = false;
  spinnerWorking: boolean = false;
  // createFormEndPoints: string;
  dropDownListing: any;
  editFormPatchValue:any =null


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
      validation: true, dropDownListing:[], endPoint: 'CREATE_COUNTRY'
    },
    {
      label: 'State Name', formControl: 'name', type: 'input', placeholder: 'Please enter state name',
      validation: true, min: 3, max: 50, regex: 'alphanumericDashUnderScore'
    },
  ]
  cityForm: any = [
    {
      label: 'Country Name', formControl: 'country', type: 'dropdown', placeholder: 'Please select country name',
      validation: true, dropDownListing: [], endPoint: 'CREATE_COUNTRY'
    },
    {
      label: 'State Name', formControl: 'state', type: 'dropdown', placeholder: 'Please select state name',
      validation: true, dropDownListing: [],endPoint: 'CREATE_STATE'
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
      group[item.formControl] = new UntypedFormControl(null, item.validation ? [Validators.required, Validators.minLength(item.min), Validators.maxLength(item.max)] : [])

    })
    this.dynamicForm = new UntypedFormGroup(group)
  }




  changeTab(tabName: string = "Country", tabSelect: any = null) {
    this.tabName = tabName
    this.getTableData = false
    this.tabChangeValue = tabSelect
    this.formDetails = []

    
    if (tabName == 'Country') {
      this.formDetails =  JSON.parse(JSON.stringify(this.countryForm))
      this.endPointChange = this.endpoints.GET_REGION
      this.countryRow = [
      { orderable: true, data: 'name', headerName: 'Name' },
      { orderable: true, data: 'description', headerName: 'Description'},
      { orderable: false, data: 'state_count', headerName: 'Count'},
      { orderable: false, data: 'action',edit:false,delete:true, headerName: 'Action',validation:'state_count'  },
      ]

    } else if (tabName == 'State') {
      this.formDetails =  JSON.parse(JSON.stringify(this.stateForm))
      this.endPointChange = this.endpoints.GET_REGION_STATE
      this.countryRow = [
        { orderable: true, data: 'country_name', headerName: 'Country Name' },
        { orderable: true, data: 'name', headerName: 'State Name' },
        { orderable: true, data: 'city_count', headerName: 'Count' },
        { orderable: false, data: 'action',edit:true,delete:true, headerName: 'Action' ,validation:'city_count'},
      ]

    } else {
      this.formDetails =  JSON.parse(JSON.stringify(this.cityForm))
      this.endPointChange = this.endpoints.GET_REGION_CITY

      this.countryRow = [
        { orderable: true, data: 'country_name', headerName: 'Country Name' },
        { orderable: true, data: 'state_name', headerName: 'State Name' },
        { orderable: true, data: 'name', headerName: 'City Name' },
        { orderable: true, data: 'latitude', headerName: 'Latitude' },
        { orderable: true, data: 'longitude', headerName: 'Longitude' },
        { orderable: false, data: 'action',edit:true,delete:true, headerName: 'Action' },
      ]

    }

    setTimeout(() => {
      this.getUserList()

    }, 10);

  }



  openPopUp(content, tag) {
    this.editFormPatchValue=null
    this.formControlAdd() ;


    console.log(this.stateForm,this.formDetails);
    
    this.formDetails.forEach(item => {
      if (item && item.type == "dropdown") {
          this.getDropDownListing(item)
      }
    })

    if(tag){
      this.editFormPatchValue = tag
      this.dynamicForm.patchValue(this.editFormPatchValue)
    }


    
    this.modalReference$ = this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'm-content ',
    });
    this.formOpen = true;
    return
  }








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
    if(this.editFormPatchValue){
      this.dynamicForm.patchValue(this.editFormPatchValue)
    }


  }
  createForm() {
    if (this.dynamicForm.invalid) {
      return
    }

    this.spinnerWorking = true
    let data = this.dynamicForm.value
    let formData = this.commonService.createFormData(data)
    let urlEndPoint = this.getEndPoint()
let method:string;
    if(this.editFormPatchValue){
      urlEndPoint =urlEndPoint+this.editFormPatchValue.id
      method = 'Patch'
    }else{
      method = 'POST'

    }

    console.log(this.editFormPatchValue,urlEndPoint);
    

    this.CreateSubscribtion$ = this.commonService
      .commonRequest(method,urlEndPoint, formData)
      .pipe(debounceTime(500))
      .subscribe({
        next:
          (resp) => {
            this.spinnerWorking = false
            if (resp.resCode == "1") {
              this.getUserList()
              this.modalReference$.close()
              this.commonService.callAlert('', resp.message, 'success')
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
    this.deletepopUp = false

    if (data && data.popUp == 'close') {
      this.getUserList()
    }

  }


  openPopupDelete(data:any,disable:any,tag:string) {

    console.log(disable);
    
    if(tag == 'single' && data[disable.validation]){
return
    }
    let urlEndPoint = this.getEndPoint()
    this.deletePopData.name=this.tabName
    if(data){
      this.deletePopData.url=urlEndPoint+data.id

    }else{
      this.deletePopData.url=urlEndPoint

    }
    this.deletepopUp = true

  }


  getEndPoint(){
let urlEndPoint:string=''
    if (this.tabName == 'Country') {
      // this.createFormEndPoints = this.endpoints.CREATE_COUNTRY
      urlEndPoint = this.endpoints.CREATE_COUNTRY
    } else if (this.tabName == 'State') {
      urlEndPoint = this.endpoints.CREATE_STATE
    } else {
      urlEndPoint = this.endpoints.CREATE_CITY

    }

    return urlEndPoint
  }

 
}
