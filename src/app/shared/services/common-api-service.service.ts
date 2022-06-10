import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonApiServiceService {

  constructor(private http:HttpClient) { }


  public getRequest(API_URL: string): Observable<any> {
    return this.http.get(API_URL);
  }
}
