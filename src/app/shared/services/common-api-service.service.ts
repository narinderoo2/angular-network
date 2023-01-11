import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map, catchError} from 'rxjs';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonApiServiceService {

  constructor(private http:HttpClient) { }


  public getRequest(API_URL: string): Observable<any> {
    return this.http.get(API_URL);
  }


  public postRequest(API_URL: any, queryparam: any): Observable<any> {
    return this.http.post(API_URL, queryparam).pipe(catchError(err => throwError(err)));
  }
  public deleteRequest(API_URL: any, queryparam: any=null): Observable<any> {
    return this.http.delete(API_URL, queryparam).pipe(catchError(err => throwError(err)));
  }

  public commonRequest(method:string,API_URL: any, queryparam:any): Observable<any> {
    
    return this.http.request(method, API_URL,{ body: queryparam }).pipe(catchError(err => throwError(err)));
  }
    // return this.http.delete(API_URL, queryparam).pipe(catchError(err => throwError(err)));
  // }



  createFormData(item) {
    console.log(item);
    
    let form_data = new FormData();
    for (var key in item) {
      let value = '';

      // console.log(key,item,'key');
      
      if (item[key] || item[key] == 0) {
        value = item[key];
      }

      console.log(key,value,'----');
      
      form_data.append(key, value);
    }
    return form_data;
  }

  callAlert(
    title = '',
    msg = 'Unable to fetch the data, Please contact system administrator or try again later!',
    icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'error',
    timer: number = 10000
  ) {
    Swal.fire({
      title: title,
      icon: icon,
      html: msg,
      timer: timer,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      showConfirmButton: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: '',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
    });
  }

}
