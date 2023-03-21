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
  public GET_USER_PAGINATION: string='';
  public LOGIN_EMAIL_CHECK: string='';
  public LOGIN_OTP_VERIFY: string='';
  public DASHBOARD_CHART_LISTING: string='';
  public GET_ROLE: string='';
  public GET_PERMISSION: string='';
  public GET_DROP_DOWN_LISTING: string='';
  public test: string='';
  constructor() { 

    this.getDomain()
  }


  

  getDomain(){
    this.IP_PORT = this.DOMAIN + this.PORT
    this.USER_LISTING= this.IP_PORT + 'account/user-listing/';
    this.USER_CREATE= this.IP_PORT + 'account/user-create/';
    this.GET_USER_PAGINATION= this.IP_PORT + 'account/user-pagination/';

    this.GET_REGION= this.IP_PORT + 'region/country-pagination/';
    this.GET_REGION_STATE= this.IP_PORT + 'region/state-pagination/';
    this.GET_REGION_CITY= this.IP_PORT + 'region/city-pagination/';
    this.CREATE_COUNTRY= this.IP_PORT + 'region/country/';
    this.CREATE_STATE= this.IP_PORT + 'region/state/';
    this.CREATE_CITY= this.IP_PORT + 'region/city/';
    this.LOGIN_EMAIL_CHECK= this.IP_PORT + 'account/email-check/';
    this.LOGIN_OTP_VERIFY= this.IP_PORT + 'account/forget-password/';

    this.DASHBOARD_CHART_LISTING= this.IP_PORT + 'chart/device-details/';
    this.GET_ROLE= this.IP_PORT + 'account/role/';
    this.GET_PERMISSION= this.IP_PORT + 'account/permission/';
    this.GET_DROP_DOWN_LISTING= this.IP_PORT + 'drop-down/listing/';



    this.test= this.IP_PORT + 'chart/test/';
  }

}
