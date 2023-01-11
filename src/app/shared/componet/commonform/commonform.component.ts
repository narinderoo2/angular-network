import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorsMessagesService } from '../../services/errors-messages.service';

@Component({
  selector: 'app-commonform',
  templateUrl: './commonform.component.html',
  styleUrls: ['./commonform.component.scss']
})
export class CommonformComponent implements OnInit {


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

  constructor(    private _ems: ErrorsMessagesService,
    ) { }

  ngOnInit(): void {
    this.errorMessages = this._ems.regionManagement;
    this.formDetails = this.stateForm
this.formShow = true
  }

  formDetails: any;
  errorMessages: any;
  dynamicForm: FormGroup;
  formShow:boolean=false

  formControlAdd() {
    let group = {}
    this.formDetails.forEach(item => {
      group[item.formControl] = new FormControl(null, item.validation ? [Validators.required, Validators.minLength(item.min), Validators.maxLength(item.max)] : [])

    })
    this.dynamicForm = new FormGroup(group)
  }

  createForm(){

  }

  resetForm(){

  }

}
