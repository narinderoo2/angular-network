import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private fb: FormBuilder,
    ) {

  }

  data: any = []
  data2: any = []
  getData: any = []
  getDataNew: any = []
  createRange: any = []

  // edit 
  edit: boolean = false
  editcondition: boolean = false


  ngOnInit(): void {

   



    this.data = [
      {
        "MODULE_LIST_ID": 1,
        "MODULE_NAME": "User Management",
        "MODULE_PERMISSON_ALL": "0",
        "MODULE_PERMISSON_READ": "0",
        "MODULE_PERMISSON_WRITE": "0",
        "MODULE_PERMISSON_UPDATE": "0",
        "MODULE_PERMISSON_DELETE": "0",
        "MODULE_CREATED_DATE": "2022-01-12T17:00:28.000Z"
      },
      {
        "MODULE_LIST_ID": 2,
        "MODULE_NAME": "Role Management",
        "MODULE_PERMISSON_ALL": "0",
        "MODULE_PERMISSON_READ": "0",
        "MODULE_PERMISSON_WRITE": "0",
        "MODULE_PERMISSON_UPDATE": "0",
        "MODULE_PERMISSON_DELETE": "0",
        "MODULE_CREATED_DATE": "2022-01-12T17:03:11.000Z"
      },
      {
        "MODULE_LIST_ID": 3,
        "MODULE_NAME": "Project Management",
        "MODULE_PERMISSON_ALL": "0",
        "MODULE_PERMISSON_READ": "0",
        "MODULE_PERMISSON_WRITE": "0",
        "MODULE_PERMISSON_UPDATE": "0",
        "MODULE_PERMISSON_DELETE": "0",
        "MODULE_CREATED_DATE": "2022-01-12T17:03:11.000Z"
      }
    ]
    this.data2 = [
      {
        "MODULE_LIST_ID": 1,
        "MODULE_NAME": "User Management",
        "MODULE_PERMISSON_ALL": "0",
        "MODULE_PERMISSON_READ": "1",
        "MODULE_PERMISSON_WRITE": "1",
        "MODULE_PERMISSON_UPDATE": "0",
        "MODULE_PERMISSON_DELETE": "0",
        "MODULE_CREATED_DATE": "2022-01-12T17:00:28.000Z"
      },
      {
        "MODULE_LIST_ID": 2,
        "MODULE_NAME": "Role Management",
        "MODULE_PERMISSON_ALL": "0",
        "MODULE_PERMISSON_READ": "0",
        "MODULE_PERMISSON_WRITE": "0",
        "MODULE_PERMISSON_UPDATE": "0",
        "MODULE_PERMISSON_DELETE": "0",
        "MODULE_CREATED_DATE": "2022-01-12T17:03:11.000Z"
      },
      {
        "MODULE_LIST_ID": 3,
        "MODULE_NAME": "Project Management",
        "MODULE_PERMISSON_ALL": "0",
        "MODULE_PERMISSON_READ": "0",
        "MODULE_PERMISSON_WRITE": "0",
        "MODULE_PERMISSON_UPDATE": "0",
        "MODULE_PERMISSON_DELETE": "0",
        "MODULE_CREATED_DATE": "2022-01-12T17:03:11.000Z"
      }
    ]

    // if (this.edit) {
    //   this.editcondition = true
    //   this.getData = {
    //     roleId: "1",
    //     roleName: "sda",
    //     roleDescription: "sda",
    //     selectedModule: ["2", "3"],
    //     modulePermission: [{ moduleId: "2", all: "0", permissionRead: "1", permissionWrite: "0", permissionUpdate: "0", permissionDelete: "0" },
    //     { moduleId: "3", all: "1", permissionRead: "1", permissionWrite: "1", permissionUpdate: "1", permissionDelete: "0" },
    //     ]
    //   }
    //   this.setValueOption()
    // }
  }

  newData: any = []
  public details: any = [
    // { id: 1, name: 'all',isChecked:false},
    { id: '', name: 'delete', isChecked: false },
    { id: '', name: 'read', isChecked: false },
    { id: '', name: 'update', isChecked: false },
    { id: '', name: 'write', isChecked: false },
  ];

  setValueOption() {
    if (this.editcondition) {

      this.listingFilter.module.forEach(element => {

        console.log(element);
        
        this.selectOption(element, "all")
      }
      )
    }



  }
  // 
  setPermission: any = []
  selectOption(id, condition) {

    let data = []

    if (this.editcondition) {
      data = id
    } else {
      data = id.value
    }
    let unique = this.createRange.filter(item => item == data)
    if (unique.length == 0) {

      let dataNew = {}
      let valueData = this.data.filter(item => item.MODULE_LIST_ID == data)

      Object.entries(valueData[0]).map(item => console.log(item)
      )


      // console.log(valueData[0].MODULE_NAME);
      this.newData.push(valueData[0])

      if (this.editcondition) {
        let valueData1 =
          this.listingFilter.id.filter(item => item.MODULE_ID == data )
          
        this.createRange.push(data)
        dataNew = {
          id: valueData1[0],
          permission: this.details,
          data: valueData[0].MODULE_NAME
        }
      } else {
      
        this.createRange.push(data)
        dataNew = {
          id: {
            moduleId: data,
            all: '0',
            permissionRead: '0',
            permissionWrite: '0',
            permissionUpdate: '0',
            permissionDelete: '0'
          },
          permission: this.details,
          data: valueData[0].MODULE_NAME
        }
        // this.setPermission.push(dataNew)
      }



      this.setPermission.push(dataNew)

    }

    console.log(this.setPermission);

  }

  selectAllBtn:boolean = false
  selectAllcheck(){
    this.selectAllBtn = false
    
  }


  checkPermission(event, ab, b) {
    let a = event.checked
    let ac = event.value

    console.log(ac,a ,'==========================');
    
    this.selectAllcheck()

    this.setPermissionValue(a, b, ab)
  }

  checkPermissionall(event, id) {

    let a = event.target.checked
    let perimision = { id: 1 }

    let abbb = this.setPermission.filter(item =>
      item.id.moduleId == id.id.moduleId)
      .map(item => (item['isChecked'] = a))


    console.log(a, id);
    this.setPermissionValue(a, perimision, id.id)

  }

  setPermissionValue(a, id, data) {

    console.log(a, id, data);
    if (id.id == '1') {

      data.all = a ? '1' : '0'
      data.permissionDelete = a ? '1' : '0'
      data.permissionRead = a ? '1' : '0'
      data.permissionUpdate = a ? '1' : '0'
      data.permissionWrite = a ? '1' : '0'
    } else {

      data.isChecked = false

      


      if (id.id == '2') {
        data.permissionDelete = a ? '1' : '0'
      } else if (id.id == '3') {


        data.permissionRead = a ? '1' : '0'
      } else if (id.id == '4') {
        data.permissionUpdate = a ? '1' : '0'
      } else if (id.id == '5') {
        data.permissionWrite = a ? '1' : '0'
      }

    }

    console.log(this.setPermission);

  }


  removedata(event) {
    this.createRange.splice(event, 1)
    this.newData.splice(event, 1)
    this.setPermission.splice(event, 1)
  }

  allPermission(event, id, t) {
    let a = event.checked

  }



  listingFilter:any;
  getId(dd){
    this.editcondition = true
    this.listingFilter = []
let data = this.getDataNew.filter(item => item.ROLE_ID == dd.ROLE_ID)

let modulename = dd.Selected_modulem.split(',')
// console.log(modulename);

this.listingFilter={
  id:data,
  name:dd.RoleName,
  module:modulename
}
  



console.log(this.listingFilter,'ROLE_ID,Selected_modulem: "1,2,3"RoleName: "adiuyiu"');
this.setValueOption()
    
  }
}
