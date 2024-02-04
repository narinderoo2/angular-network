import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NmsModule } from '../nms.module';

@Component({
  selector: 'app-nested-json',
  templateUrl: './nested-json.component.html',
  styleUrls: ['./nested-json.component.scss'],
})
export class NestedJsonComponent implements OnInit {

  jsonData:any={

    "lldpMIB": {
      "name": "lldpMIB",
      "oid": "1.0.8802.1.1.2",
      "class": "moduleidentity",
      "revisions": [
        {
          "revision": "2005-05-06 00:00",
          "description": "Published as part of IEEE Std 802.1AB-2005 initial version."
        }
      ],
      "lastupdated": "200505060000Z",
      "organization": "IEEE 802.1 Working Group",
      "contactinfo": "WG-URL: http://grouper.ieee.org/groups/802/1/index.html WG-EMail: stds-802-1@ieee.org Contact: Paul Congdon Postal: Hewlett-Packard Company 8000 Foothills Blvd. Roseville, CA 95747 USA Tel: +1-916-785-5753 E-mail: paul_congdon@hp.com",
      "description": "Management Information Base module for LLDP configuration, statistics, local system data and remote systems data components. Copyright (C) IEEE (2005). This version of this MIB module is published as subclause 12.1 of IEEE Std 802.1AB-2005; see the standard itself for full legal notices."
    },
   
    "lldpNotificationsGroup": {
      "name": "lldpNotificationsGroup",
      "oid": "1.0.8802.1.1.2.2.2.8",
      "class": "notificationgroup",
      "objects": [
        {
          "module": "LLDP-MIB",
          "object": "lldpRemTablesChange"
        }
      ],
      "status": "current",
      "description": "The collection of notifications used to indicate LLDP MIB data consistency and general status information. This group is mandatory for agents which implement the LLDP and have the capability of receiving LLDP frames."
    },

    "meta": {
      "comments": [
        "ASN.1 source file:///home/anupam/mibParser/LLDP-MIB.mib",
        "Produced by pysmi-0.3.4 at Thu Jan 18 21:32:04 2024",
        "On host localhost.localdomain platform Linux version 5.14.0-404.el9.aarch64 by user anupam",
        "Using Python version 3.9.18 (main, Sep  7 2023, 00:00:00) "
      ],
      "module": "LLDP-MIB"
    }
   
  }




permissionArrData:any = []

  constructor(private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.JsonShow()
    this.permissionArrData = this.jsonData

  }


  JsonShow(){

    // this.jsonData
   



  }



  typeOfDataFormate(row){

    console.log(Array.isArray(row), Object.prototype.toString.call(row), '********************************', row);


    if(Array.isArray(row)){
return `[${row.length}]`
    }else if(Object.keys(row)){
return '{}'
    }
    

  }

  objectCheck(row , checkType:string ){

    console.log(row, 'object');

    // if(Object.prototype.toString.call(row.value) == '[object Array]'){
    if(Object.prototype.toString.call(row.value) == '[object Object]'  && checkType == 'object'){
      return true
    }else if(Object.prototype.toString.call(row.value) == '[object Array]'  && checkType == 'array'){
      return true
    }
    
    return false;
  }


  checkStatusChild(status) {

    console.log(status,'***8');
    
    if (status == 'first') {
      return 'second';
    }

    return 
  }


  isArray(val): boolean { return  typeof val === "string" }



  ngAfterContentChecked() {
    this.cdref.detectChanges();

  }

}
