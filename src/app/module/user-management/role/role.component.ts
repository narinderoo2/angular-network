import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonApiServiceService } from 'src/app/shared/services/common-api-service.service';
import { CommonhelperService } from 'src/app/shared/services/commonhelper.service';
import { EndPointService } from 'src/app/shared/services/end-point.service';
import { ErrorsMessagesService } from 'src/app/shared/services/errors-messages.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {


  roleLisiting:any = []
  spinnerWorking:boolean = true

  permissionForm: any = [
    {
      label: 'Name', formControl: 'name',
      type: 'input', placeholder: 'Please enter role name',
      validation: true, min: 3, max: 50,
      regex: 'alphanumericDashUnderScore'
    },
  ]
  submitFormEndpoint: any = {
    type: 'create',
    endPoint: 'GET_PERMISSION',
  }
  openDynamicForm: boolean = false

  constructor(
    private _commonHelperservice: CommonhelperService,
    private _commonService: CommonApiServiceService,
    private _endpoints: EndPointService,
    private _ems: ErrorsMessagesService,
    private _modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getRoleListing()
  }

   async getRoleListing(){
    this.spinnerWorking = true
     let apiData:any =  await this._commonService.getDropDownData(this._endpoints.GET_ROLE)     
     if(apiData){
        this.roleLisiting = apiData  
     }
    this.spinnerWorking = false
  }


  roleCreate(){
    this.openDynamicForm = true

    return 
  }

  // Dyanamic form pop up output
  outPutEvent(event) {
    if (event) {
      if (event.call == "listing") {
        this.getRoleListing()
      }
      this.openDynamicForm = false
    }
  }

}

