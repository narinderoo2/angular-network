import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonhelperService {


  totalRecords: number = 50;
  ngprimeMenuOptions:any= {
    rowPage:10,
    rowsPerPageOptions:[10,50,100,100]
  }


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
        responsive: true,
        fixedHeader: true,
        colReorder: true,


        dom: 'Bfrtip',

        buttons: [ {
          extend: 'colvis',
          columnText: function ( dt, idx, title ) {
            // '<input type="checkbox">'
              return  (idx+1)+': '+title;
          }
      } ],
        // buttons: [
        //     {
        //         extend: 'colvis',
        //         collectionLayout: 'fixed columns',
        //         collectionTitle: 'Column visibility control'
        //     }
        // ],
        // colReorder: true,

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


     /* Client side configuration for data static table */
  public settingDataTableNew(
    columnDefs: any = [],
    orders: any = [],
    paging = false,
    info = false,
    scrollX: any = false,
    scrollY: any = false,
    fixedColumns: any = false,
    scrollCollapse: any = false
  ) {
let paginate={
  first: 'First',
  next: 'Next',
  previous: 'Previous',
  last: 'Last',
}

// alert(scrollX)
    return {
      paging: paging,
      pagingType: 'simple_numbers',
      pageLength: 10,
      processing: true,  //processing show on table if processing is true
      scrollY: scrollY,
      scrollCollapse: scrollCollapse,
      scrollX: scrollX,
      fixedColumns: fixedColumns,
      "fnFooterCallback": function (nRow, aaData, iStart, iEnd, aiDisplay) {
        if (aiDisplay.length > 0) {
            this.closest('.dataTables_wrapper').removeClass('noRecordInTable');
        }
        else {
          this.closest('.dataTables_wrapper').addClass('noRecordInTable');
        }
    },

      // empty: '<span> No record Available <span>',
      searching: true,
      info: info,
      columnDefs: columnDefs,
      order: orders,
      language: {
        processing: '<span class="spinner-border text-primary" style="width: 32px; height: 32px" role="status"><span class="sr-only"></span></span>',
        searchPlaceholder: 'Search',
        searchPanes: {
          emptyPanes: 'There are no panes to display. :/',
        },
        lengthMenu: '_MENU_',
        zeroRecords: '<span>No Data Available</span>',
        // zeroRecords: '<img src="../../assets/images/No-data-found.svg"/>',

        info: 'Showing _START_ to _END_ of _TOTAL_ entries',
        infoEmpty: 'No Record Available',
        infoFiltered: '(filtered from _MAX_ total entries)',
        search: '<i class="fas fa-search"></i>',
        paginate: paginate,
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
      }
    } else {
      if(ordering){
        params.append('ordering', ordering);


      }else{
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

    }
    if(pageLimit!='-1'){
      params.append('page', pageOffset);
      params.append('size', pageLimit);
    }
  }


  /* Server side configuration for data table */
  public primeNgServerTable(event,order:string) {
    console.log(event);
    
        let fitler: any = {
          page: event.first / event.rows + 1,
          size: event.rows,
          search: event.globalFilter?.value,
          ordering:event.sortField?event.sortOrder > 0 ? event.sortField:'-'+event.sortField:order
        }
        for (let row in fitler) {
          if (!fitler[row]) {
            delete fitler[row]
          }
        }    
        let filterNewData =  new URLSearchParams(fitler);
        return filterNewData?.toString()
      }
}
