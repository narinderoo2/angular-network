import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndPointService {

  public DOMAIN: string = "http://127.0.0.1";
  public PORT: string = ":5000/";
  public IP_PORT: string = "";
  public USER_LISTING: string='';
  public USER_CREATE: string='';
  constructor() { 

    this.getDomain()
  }

  getDomain(){
    this.IP_PORT = this.DOMAIN + this.PORT
    this.USER_LISTING= this.IP_PORT + 'setup/user-listing';
    this.USER_CREATE= this.IP_PORT + 'setup/create-user';
  }

}
