import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { debounceTime, Subscription } from 'rxjs';
import { CommonApiServiceService } from 'src/app/shared/services/common-api-service.service';
import { CommonhelperService } from 'src/app/shared/services/commonhelper.service';
import { EndPointService } from 'src/app/shared/services/end-point.service';

export interface formValidatoins {
  label: string,
  formControl: string,
  type: string,
  placeholder: string,
  validation: boolean,
  min?: number,
  max?: number,
  regex?: string,
  position: number
}

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  pageRecordsTotal: number = 0;
  page: number = 1;
  size: number = 5;
  search: string = '';
  userDataTable: any = []
  URLSearchParams: any;
  ordering: string = '-id';

  userListSubscribtion$: Subscription;

  spinnerWorking: boolean = false
  openDynamicForm: boolean = false

  permissionForm: any = [
    {
      label: 'Role', formControl: 'role_id',
      type: 'dropdown', placeholder: 'Please select role',
      validation: true, endPoint: 'GET_DROP_DOWN_LISTING',
      dropDownListing: []
    },
    {
      label: 'Name', formControl: 'name',
      type: 'input', placeholder: 'Please enter permission name',
      validation: true, min: 3, max: 50,
      regex: 'alphanumericDashUnderScore'
    },
  ]
  submitFormEndpoint: any = {
    type: 'create',
    endPoint: 'GET_PERMISSION',
    formControlType: { role_id: 'json', name: 'string' },
    patchValue:{},
    id:''
  }

  deletepopUp: boolean = false;
  deletePopData: any = { name: 'permission', url: this.endpoints.GET_PERMISSION, confirmParms: '' }

  columnDefs: any = [
    { orderable: true, targets: 0, width: '80px' },
    { orderable: true, targets: 3, width: '40px' },
    { orderable: true, targets: '_all' },
  ];

  constructor(private commonHelperservice: CommonhelperService,
    private commonService: CommonApiServiceService,
    private endpoints: EndPointService,
) { }

  ngOnInit(): void {
    this.dtOptions = this.commonHelperservice.settingDataTableNew(
      this.columnDefs, [], true,
      true,
      false, // x scroll
      '267px',// y scroll
      true, // fixed Columns
      true //scroll Collapse
    );
    this.getPermissionList()
  }

// Get all permission listing (Client side data table use)
getPermissionList() {
    this.spinnerWorking = true;
    this.userListSubscribtion$ = this.commonService
      .getRequest(this.endpoints.GET_PERMISSION)
      .pipe(debounceTime(500))
      .subscribe({
        next: (resp) => {
          this.userDataTable = [];
          if (resp && resp.resCode == "1") {
            this.userDataTable = resp.result
          } else {
          }
          this.spinnerWorking = false;
        },
        error: (error) => {
          this.spinnerWorking = false;
          this.userDataTable = [];
        }
      }
      );
  }

  // Role name color change funtion
  colorSet(name: string) {
    switch (name) {
      case "Administrator":
        return "#71ffd5"
      case "Developer":
        return "#ff7571"
      default:
        return "#7185ff"
    }
  }

// Open dynamic reactive form
  openForm(row:any=null,tag: string) {
    if (row){
    this.submitFormEndpoint['patchValue'] = {'name':row.name, 'role_id':row.role_id.map(item=>item.id)}
    this.submitFormEndpoint['type']='update'
    this.submitFormEndpoint['id']=row.id
    }else{      
      this.submitFormEndpoint['type']='create'
    }
    this.openDynamicForm = true
  }

  // Open dynamic delete pop up
  openPopupDelete(data: any, tag: string) {
    this.deletePopData.confirmParms = data.id
    this.deletepopUp = true
  }


// dynamic form pop up output
  outPutEvent(event) {
    if (event) {
      if (event.call == "listing") {
        this.getPermissionList()
      }
      this.openDynamicForm = false
    }
  }

  // dynamic delete pop up output
  outPutDelete(data) {
    this.deletepopUp = false
    if (data && data.popUp == 'close') {
      this.getPermissionList()
    }
  }


  ngOnDestroy() {
    this.userListSubscribtion$ ? this.userListSubscribtion$.unsubscribe() : '';
  }
}
