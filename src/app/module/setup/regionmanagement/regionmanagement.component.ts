import { Component, OnInit ,ViewChild} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { debounceTime, Subscription } from 'rxjs';
import { CommonApiServiceService } from 'src/app/shared/services/common-api-service.service';
import { CommonhelperService } from 'src/app/shared/services/commonhelper.service';
import { EndPointService } from 'src/app/shared/services/end-point.service';

import { HttpClient } from '@angular/common/http';

export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
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


  pageRecordsTotal: number = 0;
  page: number = 1;
  size: number = 5;
  search: string = '';
  ordering: string = '-id';

  URLSearchParams: any;


  rowDataTable:any = []
  coutryTable:boolean =false
  columnData:any = []
  countryColumn:any = []
  countryRow:any = [{orderable: false, data: '',headerName:'ID' },
  { orderable: true, data: 'first_name',headerName:'Created By' },
  { orderable: true, data: 'last_name',headerName:'Name' },
  { orderable: true, data: 'email',headerName:'Description' },
  { orderable: false, data: '',headerName:'Action' },
]

  endPointChange:string = ''

  getTableData:boolean = false




  constructor(
    private commonHelperservice: CommonhelperService,
    private commonService: CommonApiServiceService,
    private endpoints: EndPointService,
    private http: HttpClient,
  ) { 

  }

  ngOnInit(): void {
    this.changeTab()
  }

  changeTab(tabName:string = "Country"){
    console.log(tabName);

    if(tabName == 'Country'){
      this.columnData = this.countryColumn
      this.endPointChange = this.endpoints.GET_REGION
      this.getUserList()

    }
    

  }







  reDraw(): void {
    if (this.datatableElement) {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.draw();
      });
    }
  }

  getUserList() {
    this.coutryTable = true;
    // this.userDataTable = [];
this.getTableData= true
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
        this.listSubscribtion$ = this.commonService
          .getRequest(this.endPointChange + '?' + params)
          .pipe(debounceTime(500))
          .subscribe({

            next:
              (resp) => {
                this.rowDataTable = [];

                if (resp) {

                  this.rowDataTable = resp.results
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
                  this.rowDataTable = [];
                }
              },
            error: (error) => {
              this.coutryTable = false;
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


}
