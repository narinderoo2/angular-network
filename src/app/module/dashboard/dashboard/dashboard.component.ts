import { Component, ViewChild, OnInit } from "@angular/core";

import {
  ApexNonAxisChartSeries, ApexPlotOptions, ApexChart,
  ApexFill, ChartComponent, ApexAxisChartSeries,
  ApexTitleSubtitle, ApexDataLabels, ApexYAxis, ApexXAxis,
  ApexTooltip, ApexMarkers, ApexAnnotations, ApexStroke
} from "ng-apexcharts";

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

import { data } from "../series-data";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions1: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  @ViewChild("chart1", { static: false }) chart1: ChartComponent;

  public activeOptionButton = "all";

  batteryCal: number = 0
  totalRamCal: number = 0
  useRamCal: number = 0
  useRamShow: number = 0
  cpuCal: number = 0

  constructor() { }

  ngOnInit(): void {
    this.batteryCal = this.percantageCal('battery')
    this.useRamCal = this.percantageCal('useRam')
    this.cpuCal = this.percantageCal('cpu')

    console.log(this.useRamCal, this.cpuCal);

    this.initChart1()
    this.initChart2()
  }



  initChart1(): void {
    // console.log(data);

    this.chartOptions1 = {
      series: [{
        name: "XYZ MOTORS",
        data: data
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
        min: new Date("01 Mar 2012").getTime(),
        tickAmount: 6

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
      title :{
        text: "Stock Price Movement",
        align: "left"
      },
     
    };
  }


  initChart2(): void {

    this.chartOptions2 = {
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
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
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };

  }

  percantageCal(tag: string) {
    let data: number;
    let total: number;
    if (tag == 'battery') {
      data = 40
      total = 100
    } else if (tag == 'useRam') {
      data = 6
      this.useRamShow = 6
      total = 8.4
      this.totalRamCal = 8.4
    } else if (tag == 'cpu') {
      data = 18
      total = 100
    }
    return Math.trunc((data / total) * 100)
  }

  percantageColor(value,tag:string = null) {
    let expr: number = value;
    if(tag){
      expr = 100 -value;
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






}
