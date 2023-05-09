import { Component, ViewChild, OnInit } from "@angular/core";

import {
  ApexNonAxisChartSeries, ApexPlotOptions, ApexChart,
  ApexFill, ChartComponent, ApexAxisChartSeries,
  ApexTitleSubtitle, ApexDataLabels, ApexYAxis, ApexXAxis,
  ApexTooltip, ApexMarkers, ApexAnnotations, ApexStroke
} from "ng-apexcharts";
import { Subscription } from "rxjs";
import { CommonApiServiceService } from "src/app/shared/services/common-api-service.service";
import { EndPointService } from "src/app/shared/services/end-point.service";
import { WebsocketService } from "src/app/shared/websocket.service";

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | any;
  // series: ApexNonAxisChartSeries;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  // series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  annotations: ApexAnnotations;
  colors: any;
  toolbar: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  @ViewChild("chart") chart: ChartComponent;
  public chartOptions1: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  @ViewChild("chart1", { static: false }) chart1: ChartComponent;

  public activeOptionButton = "all";

  batteryCal: number = 0
  totalRamCal: number = 0
  useRamCal: number = 0
  useRamShow: number = 0
  cpuCal: number = 0

  listingSubscribe$: Subscription;
  webScoketSubscribe$: Subscription;

  getChartlisting: any = []
  showChartListing: any = []
  ramChartSeries: any = []
  cpuChartSeries: any = []

  divSpinner: boolean = false
  ramChartCheck: boolean = false
  cpuChartCheck: boolean = false
  liveMode: boolean = false



  constructor(
    private commonService: CommonApiServiceService,
    private endpoints: EndPointService,
    private websocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.commonService.getRequest(this.endpoints.test).subscribe({
      next: (res) => {


      }
    })


    this.getChartDevice()
  }

  public updateSeries(item) {
    this.chartOptions1.series = [{
      data: item
    }];
  }
  public updateSeries2(item) {
    this.chartOptions2.series = [{
      data: item
    }];
  }

  ramChart(): void {
    this.chartOptions1 = {
      series: [{
        name: "Ram Utilization",
        data: this.ramChartSeries
      }],
      chart: {
        type: "area",
        height: 220,
        stacked: false,
        toolbar: {
          show: false
        }
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: "#999",
            label: {
              text: "Support",
              style: {
                color: "#fff",
                background: "#00E396"
              }
            }
          }
        ],
        xaxis: [
          {
            x: new Date("14 Nov 2012").getTime(),
            borderColor: "#999",
            label: {
              text: "Rally",
              style: {
                color: "#fff",
                background: "#775DD0"
              }
            }
          }
        ]
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      title: {
        text: "Stock Price Movement",
        align: "left"
      },

    };
    this.ramChartCheck = true

  }


  cpuChart(): void {

    this.chartOptions2 = {
      series: [
        {
          name: "CPU Utilization",
          data: this.cpuChartSeries
        },
      ],
      chart: {
        height: 220,
        type: "area",
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
    this.cpuChartCheck = true

  }

  percantageCal(tag: string) {
    let data: number;
    let total: number;
    if (tag == 'battery') {
      data = this.showChartListing['battery']
      total = 100
    } else if (tag == 'useRam') {
      data = this.showChartListing['useRam']
      this.useRamShow = this.showChartListing['useRam']
      total = this.showChartListing.deivce_ram.match(/[\d\.]+|\D+/g)[0]
      this.totalRamCal = this.showChartListing.deivce_ram
    } else if (tag == 'cpu') {
      data = this.showChartListing['cpu']
      total = 100
    }
    return Math.trunc((data / total) * 100)
  }

  percantageColor(value, tag: string = null) {
    let expr: number = value;
    if (tag) {
      expr = 100 - value;
    }
    let day: any;
    switch (expr > 0) {
      case expr <= 10:
        day = "#e90404";
        break;
      case expr <= 20:
        day = "#df5050";
        break;
      case expr <= 40:
        day = "#e5ae91";
        break;
      case expr <= 50:
        day = "#f1cf89";
        break;
      case expr <= 70:
        day = "#3eb750b5";
        break;
      case expr <= 90:
        day = "#01ab1ab5";
      case expr <= 100:
        day = "#00db20";
    }

    // if(tag){
    //   console.log(day,value
    //     );

    // }

    return day

  }


  getChartDevice() {
    this.divSpinner = false
    this.listingSubscribe$ = this.commonService.getRequest(this.endpoints.DASHBOARD_CHART_LISTING).subscribe({
      next: (res) => {
        this.getChartlisting = []
        this.showChartListing = []
        this.ramChartSeries = []
        this.cpuChartSeries = []
        this.divSpinner = true
        if (res.resCode == '1') {
          this.getChartlisting = res.result
          this.showChartListing = Object.assign({}, res.result[0])



          if (this.getChartlisting[0].data.length > 0) {
            this.chartDataModification(this.getChartlisting[0].data)
          }

          this.batteryCal = this.percantageCal('battery')
          this.useRamCal = this.percantageCal('useRam')
          this.cpuCal = this.percantageCal('cpu')



        } else {
          this.commonService.callAlert('', res.message, 'error')
        }
      },
      error: (error) => {
        this.divSpinner = true
        this.getChartlisting = []
        this.showChartListing = []
        this.commonService.callAlert()

      }
    })
  }



  chartDataModification(data: any) {

    data.forEach((item, index) => {
      this.ramChartSeries.push([item.time, item.ram.match(/[\d\.]+|\D+/g)[0]])
      this.cpuChartSeries.push([item.time, item.cpu.match(/[\d\.]+|\D+/g)[0]])
      if (data.length == index + 1) {
        this.showChartListing['battery'] = item.battery
        this.showChartListing['useRam'] = item.ram.match(/[\d\.]+|\D+/g)[0]
        this.showChartListing['cpu'] = item.cpu.match(/[\d\.]+|\D+/g)[0]
      }

    })
    this.ramChartCheck ? this.updateSeries(this.ramChartSeries) : this.ramChart()
    this.cpuChartCheck ? this.updateSeries2(this.cpuChartSeries) : this.cpuChart()

  }


  liveModeActive(event) {
    let data = event.target.checked

    if (data) {
      this.webSocket()
    } else {
      this.websocketService.closeUserSocket();
      this.webScoketSubscribe$ ? this.webScoketSubscribe$.unsubscribe() : '';
      this.getChartDevice()

    }
    this.liveMode = data



  }
  cHAT_URL = "ws://localhost:8000/ws/device-details/";
  webSocket() {
    this.websocketService.connect(this.cHAT_URL)
    setTimeout(() => {
      this.websocketService.send("Windows:DESKTOP-1S0Q7HM ")
      this.webScoketSubscribe$ = this.websocketService.messages$.subscribe((res: any) => {
        res = JSON.parse(res.value)
        if (res) {
          console.log(res)
          this.ramChartSeries.splice(0, this.ramChartSeries.length - 9)
          this.cpuChartSeries.splice(0, this.cpuChartSeries.length - 9)
          this.ramChartSeries.push([res.time, res.ram.match(/[\d\.]+|\D+/g)[0]])
          this.cpuChartSeries.push([res.time, res.cpu.match(/[\d\.]+|\D+/g)[0]])
          this.updateSeries(this.ramChartSeries)
          this.updateSeries2(this.cpuChartSeries)
          this.showChartListing['battery'] = res.battery
          this.showChartListing['useRam'] = res.ram.match(/[\d\.]+|\D+/g)[0]
          this.showChartListing['cpu'] = res.cpu.match(/[\d\.]+|\D+/g)[0]
          this.batteryCal = this.percantageCal('battery')
          this.useRamCal = this.percantageCal('useRam')
          this.cpuCal = this.percantageCal('cpu')


        }


      })
    }, 2000);


  }

  ngOnDestroy(): void {
    this.websocketService.closeUserSocket();
    this.webScoketSubscribe$ ? this.webScoketSubscribe$.unsubscribe() : '';
  }

}
