
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TestService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
  };


//   headers: {
//     'content-type': 'multipart/form-data'
// }
  constructor(private http: HttpClient) { }


  public postAPIMethod(url: any, postData: any): Observable<any> {
    return this.http.post<any>(url, postData).pipe(
      map((res: any) => { return res; }));
  }
  
}
