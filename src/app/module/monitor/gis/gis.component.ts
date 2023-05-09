import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import { MarkerWithLabel } from '@googlemaps/markerwithlabel';

import { Subscription } from 'rxjs';
@Component({
  selector: 'app-gis',
  templateUrl: './gis.component.html',
  styleUrls: ['./gis.component.scss']
})
export class GisComponent implements OnInit {

  gisMapSubscribe: Subscription;
  placeSubscribe: Subscription;
  getListSubscribe: Subscription;
  
  inDownTimeHost:number=0;
  searchLatLngInput:string='';



  @ViewChild('map_canvas',{static: false}) mapElement: ElementRef;

   mapProp= {
    // center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
  };
  constructor() { }

  ngOnInit(): void {
    // var map = new google.maps.Map(document.getElementById("googleMap"),this.mapProp);
  }

}
