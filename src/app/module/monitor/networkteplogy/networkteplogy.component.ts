import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-networkteplogy',
  templateUrl: './networkteplogy.component.html',
  styleUrls: ['./networkteplogy.component.scss']
})
export class NetworkteplogyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



  topolgyData(){
    let ab = {
      "NMS_Sys": {
          "ip": "192.168.1.1",
          "Model": "NA",
          "Vendor": "Nivetti",
          "deviceType": "Linux",
          "neighbours": {
              "Cisco_Core_SW": {
                  "neighbour_ip": "192.168.1.253",
                  "neighbour_port": "1Gbps"
              },
              "FIDS_Sys": {
                  "neighbour_ip": "192.168.1.6",
                  "neighbour_port": "1Gbps"
              },
              "NMS_Sys1": {
                  "neighbour_ip": "192.168.1.5",
                  "neighbour_port": "1Gbps"
              },
              "NMS_Sys2": {
                  "neighbour_ip": "192.168.1.2",
                  "neighbour_port": "1Gbps"
              },
              "NMS_Sys3": {
                  "neighbour_ip": "192.168.1.3",
                  "neighbour_port": "1Gbps"
              },
              "NMS_Sys4": {
                  "neighbour_ip": "192.168.1.4",
                  "neighbour_port": "1Gbps"
              }
          }
      },
      "Cisco_Core_SW": {
          "ip": "192.168.1.253",
          "Model": "NA",
          "Vendor": "Nivetti",
          "deviceType": "Linux",
          "neighbours": {
              "Cisco_SW2": {
                  "neighbour_ip": "192.168.1.252",
                  "neighbour_port": "1Gbps"
              }
          }
      },
      "NMS_Sys1": {
          "ip": "192.168.1.5",
          "Model": "NA",
          "Vendor": "Nivetti",
          "deviceType": "Linux",
          "neighbours": {}
      },
      "NMS_Sys2": {
          "ip": "192.168.1.2",
          "Model": "NA",
          "Vendor": "Nivetti",
          "deviceType": "Linux",
          "neighbours": {
              "Dis_City_RL1": {
                  "neighbour_ip": "192.168.1.9",
                  "neighbour_port": "1Gbps"
              }
          }
      },
      "NMS_Sys3": {
          "ip": "192.168.1.3",
          "Model": "NA",
          "Vendor": "Nivetti",
          "deviceType": "Linux",
          "neighbours": {
              "Dis_City_RL2": {
                  "neighbour_ip": "192.168.1.10",
                  "neighbour_port": "1Gbps"
              }
          }
      },
      "NMS_Sys4": {
          "ip": "192.168.1.4",
          "Model": "NA",
          "Vendor": "Nivetti",
          "deviceType": "Linux",
          "neighbours": {
              "Dis_City_RL3": {
                  "neighbour_ip": "192.168.1.11",
                  "neighbour_port": "1Gbps"
              }
          }
      },
      "FIDS_Sys": {
          "ip": "192.168.1.6",
          "Model": "NA",
          "Vendor": "Nivetti",
          "deviceType": "Linux",
          "neighbours": {}
      },
      "Cisco_SW2": {
          "ip": "192.168.1.252",
          "Model": "NA",
          "Vendor": "Nivetti",
          "deviceType": "Linux",
          "neighbours": {
              "Camera_Samsung": {
                  "neighbour_ip": "192.168.1.7",
                  "neighbour_port": "1Gbps"
              },
              "Camera_CP_Plus": {
                  "neighbour_ip": "192.168.1.8",
                  "neighbour_port": "1Gbps"
              }
          }
      },
      "Dis_City_RL1": {
          "ip": "192.168.1.9",
          "Model": "NA",
          "Vendor": "Nivetti",
          "deviceType": "Linux",
          "neighbours": {}
      },
      "Dis_City_RL2": {
          "ip": "192.168.1.10",
          "Model": "NA",
          "Vendor": "Nivetti",
          "deviceType": "Linux",
          "neighbours": {}
      },
      "Dis_City_RL3": {
          "ip": "192.168.1.11",
          "Model": "NA",
          "Vendor": "Nivetti",
          "deviceType": "Linux",
          "neighbours": {}
      },
  
  
   "Camera_Samsung": {
          "ip": "192.168.1.7",
          "Model": "NA",
          "Vendor": "Nivetti",
          "deviceType": "Linux",
          "neighbours": {}
      },
   "Camera_CP_Plus": {
          "ip": "192.168.1.8",
          "Model": "NA",
          "Vendor": "Nivetti",
          "deviceType": "Linux",
          "neighbours": {}
      }
  }
  }

}
