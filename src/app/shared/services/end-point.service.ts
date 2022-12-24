import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndPointService {

  public DOMAIN: string = "http://127.0.0.1";
  public PORT: string = ":8000/";
  public IP_PORT: string = "";
  public USER_LISTING: string='';
  public USER_CREATE: string='';
  public GET_REGION: string='';
  public GET_REGION_STATE: string='';
  public GET_REGION_CITY: string='';
  public CREATE_COUNTRY: string='';
  public CREATE_STATE: string='';
  public GET_STATE: string='';
  public CREATE_CITY: string='';
  constructor() { 

    this.getDomain()
  }


  

  getDomain(){
    this.IP_PORT = this.DOMAIN + this.PORT
    this.USER_LISTING= this.IP_PORT + 'setup/user-listing/';
    this.USER_CREATE= this.IP_PORT + 'setup/create-user/';
    this.GET_REGION= this.IP_PORT + 'region/country-pagination/';
    this.GET_REGION_STATE= this.IP_PORT + 'region/state-pagination/';
    this.GET_REGION_CITY= this.IP_PORT + 'region/city-pagination/';
    this.CREATE_COUNTRY= this.IP_PORT + 'region/country/';
    this.CREATE_STATE= this.IP_PORT + 'region/state/';
    this.CREATE_CITY= this.IP_PORT + 'region/city/';
    // this.GET_STATE= this.IP_PORT + 'region/state/';
  }

}
