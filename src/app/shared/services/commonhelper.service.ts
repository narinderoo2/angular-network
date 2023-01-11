import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonhelperService {


  totalRecords: number = 50;

  constructor() { }


    /* Server side configuration for data table */
    public settingDataTableServer(
      columnDefs: any = [],
      orders: any = [],
      fixedColumns: any = true,
      lengthMenu: number[] = [10, 50, 100,1000]
    ) {
  
      return {
        pagingType: 'simple_numbers',
        serverSide: true,
        processing: false,
        columnDefs: columnDefs,
        order: orders,
        lengthMenu: [
         lengthMenu,
         lengthMenu,
        ],
        searching: true,
        scrollY: '52vh',
        scrollX: true,
        scrollCollapse: true,
        searchDelay: 2000,
        //paging:false,
        fixedColumns: fixedColumns,






        language: {
          searchPlaceholder: 'Search',    /*' Search*/
          lengthMenu: '_MENU_',
          zeroRecords: '<span> No record Available<span>',
          // zeroRecords: '<img src="../../assets/images/No-data-found.svg"/><h6>No Data Available</h6>',
          info: 'Showing _START_ to _END_ of _TOTAL_ entries',
          infoEmpty: '',
          infoFiltered: '(filtered from _MAX_ total entries)',
          search: '<i class="fas fa-search"></i>',
          paginate: {
            first: 'First',
            next: 'Next',
            previous: 'Previous',
            last: 'Last',
          },
        },



      };
    }


      /* Method to add the parameters in the URL for DataTable */
  public dataTableParams(
    params: any,
    dataTablesParameters: any,
    pageOffset: number = 1,
    pageLimit,
    pageRecordsTotal: number = 0,
    search: string = '',
    ordering: string = '',
    otherParams: {} = null,
  ) {

//     start_date=2022-03-25 06:28:52.84155-04
// end_date
    pageLimit = dataTablesParameters.length;
    pageRecordsTotal = this.totalRecords;


    if (dataTablesParameters.start <= 1) {
      pageOffset = dataTablesParameters.start + 1;
    } else {
      pageOffset = (dataTablesParameters.start + pageLimit) / pageLimit;
    }

    if (dataTablesParameters.order.length > 0) {
      let column = dataTablesParameters.order[0];
      let columns = dataTablesParameters.columns;

      if (columns[column.column].data) {
        params.append(
          'ordering',
          column.dir === 'asc'
            ? '-' + columns[column.column].data
            : '' + columns[column.column].data
        );
        // params.append('sort', column.dir);
      }
    } else {
      if(ordering){
        params.append('ordering', ordering);


      }else{
      //  params.append('ordering', '-id');
      }
    }

    if (dataTablesParameters.search.value) {
      params.append('search', dataTablesParameters.search.value);
    }

    if (otherParams) {

        for (const [key, value] of Object.entries(otherParams)) {
          if(value){
            params.append(key,value);
          }

      }

      //params.append('search', dataTablesParameters.search.value);
    }



    if(pageLimit!='-1'){
      params.append('page', pageOffset);
      params.append('size', pageLimit);
    }

  }

  
}
