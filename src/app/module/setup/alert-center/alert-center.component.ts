import { Component, OnInit, ViewChild } from '@angular/core';
import { Editor } from 'primeng/editor';
import * as moment from 'moment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as d3 from "d3";

import * as topojson from 'topojson-client';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { TestService } from '../../test.service';
declare global {
  interface Window { // ⚠️ notice that "Window" is capitalized here
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
    
  }
}


@Component({
  selector: 'app-alert-center',
  templateUrl: './alert-center.component.html',
  styleUrls: ['./alert-center.component.scss']
})
export class AlertCenterComponent implements OnInit {


  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private testSevi: TestService,
  ) { }



  dataHai: boolean = false;
  ngOnInit(): void {






    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
    
      recognition.continuous = true;
      recognition.lang = 'en-US';
    
      recognition.onstart = function() {
        console.log('Speech recognition started');
      };
    
      recognition.onresult = function(event) {
        const transcript = event.results[event.results.length - 1][0].transcript;
        console.log('Speech recognized:', transcript);
        // Process the recognized text
      };
    
      recognition.onend = function() {
        console.log('Speech recognition ended');
        // You can restart recognition if needed
      };
    
      recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error,event);
        // Handle any errors that occur during recognition
      };
    
      // Start speech recognition
      recognition.start();
    } else {
      console.error('Speech recognition not supported');
    }
    











    return 


    let json1:any = this.testSevi.getReport()
    let json2 = this.testSevi.getReport1()


    json1.features.forEach(e => {

      // let 

      // e.properties["shortName"] = 

      json2.features.forEach(el =>{
        if(e.properties.ADMIN == el.properties.name){
          // console.log(e.properties , el.properties.name);

          el.properties['shortName'] = e.properties.ISO_A2

        }
      })
      
    });

console.log(json2);


    // this.earthMap()
    this.earthMap1()
  }


  async earthMap1() {

    let Jsondata = this.testSevi.getReport1()
    const width = 1000;
    const height = 600;



    // Create an SVG element and append it to the map div
    const svg = d3.select("#map")
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    // Define a projection for the map (you can use different projections based on your preference)
    const projection = d3.geoMercator()
      .center([0, 30])
      .scale(100)
      .rotate([-12, 0])
      .translate([width /2, height / 2])
      .precision(.2);



    //   var projection = d3.geoMercator().scale(width / 2 / Math.PI)
    // .rotate([-11, 0])
    // .translate([(width) / 2, height * 1.35 / 2])
    // .precision(.1);


    // Create a path generator using the projection
    const path = d3.geoPath().projection(projection);

    const popluatonData = [
      {
        "country": "United States",
        "population": 1
      },
      {
        "country": "China",
        "population": 2
      },
      {
        "country": "India",
        "population": 3
      },
      {
        "country": "Brazil",
        "population": 4
      },
      {
        "country": "Russia",
        "population": 5
      },
      // ... more countries and their populations
    ]

    let newData = popluatonData.map(item => item.population)
    var maxNumber = Math.max(...newData);
    let step = maxNumber / 7
    var dividedValues = [];
    // Populate the array with different values
    for (var i = 1; i <= 7; i++) {
      var partValue = step * i;
      dividedValues.push(Math.trunc(partValue));
    }


    var tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      // .style('visibility', 'hidden')
      .style('background-color', 'rgb(238, 238, 238)')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '5px')
      .style('padding', '5px')





    let zoom = d3.zoom()
      .on('zoom', handleZoom);

    function handleZoom(e) {
      d3.select('svg g')
        .attr('transform', e.transform);
    }

    function initZoom() {
      d3.select('svg')
        .call(zoom);
    }


    initZoom()

    var colors = ['rgb(238, 238, 238)', 'rgb(254, 229, 217)', 'rgb(252, 187, 161)', 'rgb(252, 146, 114)', 'rgb(251, 106, 74)', 'rgb(222, 45, 38)', 'rgb(165, 15, 21)']
    // var colors = ['rgb(238, 238, 238)']


    var thresholds = dividedValues

    // Create a threshold scale
    let thresholdScale = d3.scaleThreshold()
      .domain(thresholds)
      .range(colors);




    // Load the world map data
    function aa(world) {
      svg.append("g")
        // .attr("class", "countries11")
        .selectAll("path")
        .data(world.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "country")
        .attr("fill", d => {
          d['total'] = popluatonData.filter(item => item.country == d.properties.name)
          return thresholdScale(d.total.length > 0 ? d.total[0].population : -1)
        })
        .style("stroke", "#483d3d")
        .style("stroke-width", "0.8px")
        .attr("valuess", function (d) { return d.properties.name })
        .on('mouseover', function (dd, index, ele) {
          const clickAttributeValue = dd.target.getAttribute("valuess");
          if (clickAttributeValue) {
          }


          tooltip
              .style('top', dd.y - 60 + 'px')
              .style('left', dd.x - 30+ 'px')
              .style('visibility', 'visible')
              .html(`<span>Country Name:${clickAttributeValue}</span> `)
              console.log(dd,index,clickAttributeValue);


   
        })
        .on('mouseout', function () {
          tooltip.style('visibility', 'hidden');
        })
     
    };


    aa(Jsondata)



    // var thresholds1 = ['0', '1-3', '3-5', '5-10', '10-20', '20-100', '> 100'];

    // var thresholds1 = [10, 20, 30, 40, 50];
    var thresholds1 = dividedValues;
    var thresholdScale1 = d3.scaleThreshold()
      .domain(thresholds1)
      .range(colors);

    var svgWidth = 300; 
    var legendElementHeight = 10; 
    var numberOfThresholds = thresholds1.length; 
    var legendElementWidth = svgWidth / numberOfThresholds;






    var legend = svg.selectAll(".legend")
      .data(thresholds1)
      .enter().append("g")
      .attr("class", "legend");


    legend.append("rect")
      .attr("x", function (d, i) { return legendElementWidth * i; })
      .attr("y", height - (legendElementHeight + 40))
      .attr("width", legendElementWidth)
      .attr("height", legendElementHeight)

      .on("click", function(event, datum) {

        console.log(event);
        
        d3.selectAll("path.highlighted").classed("highlighted", false);
        d3.select(this).classed("highlighted", true);
      //   const startCharacter = datum.properties.name[0];
      //   svg.selectAll("path")
      //     .filter(d => d.properties.name[0] === startCharacter)
      //     .classed("highlighted", true);
      })



      .style("fill", function (d, i) { return colors[i]; });

    legend.append("text")
    .style("font-size", "12px")
    .style("padding", "4px")
      .attr("x", function (d, i) { return legendElementWidth * i; })
      .attr("y", height + legendElementHeight - 40)
      .text(function (d) { return d; });


      var textWidth = legend.node().getBBox().width;
var textHeight = legend.node().getBBox().height;

// Calculate the center coordinates
var centerX = (width - textWidth) / 2;
var centerY = (height - textHeight) / 2;

// Set the position of the text element to center it
legend.attr("x", centerX)
  .attr("y", centerY);








  }
  async earthMap() {
    let json = this.testSevi.getReport()
    console.log(json);




    let w = 3000;
    let h = 1250;
    // variables for catching min and max zoom factors
    var minZoom;
    var maxZoom;

    // DEFINE FUNCTIONS/OBJECTS
    // Define map projection
    var projection = d3
      .geoEquirectangular()
      .center([0, 15]) // set centre to further North as we are cropping more off bottom of map
      .scale([w / (2 * Math.PI)]) // scale to fit group width
      .translate([w / 2, h / 2]) // ensure centred in group
      ;

    // Define map path
    var path = d3
      .geoPath()
      .projection(projection)
      ;

    // Create function to apply zoom to countriesGroup
    function zoomed() {
      //   var t = d3
      //     .event
      //     .transform
      //   ;
      //   countriesGroup
      //     .attr("transform","translate(" + [t.x, t.y] + ")scale(" + t.k + ")")
      //   ;
    }

    // Define map zoom behaviour
    var zoom = d3
      .zoom()
      .on("zoom", zoomed)
      ;

    function getTextBox(selection) {
      selection
        .each(function (d) {
          d.bbox = this
            .getBBox();
        })
        ;
    }

    // Function that calculates zoom/pan limits and sets zoom to default value 
    function initiateZoom() {
      // Define a "minzoom" whereby the "Countries" is as small possible without leaving white space at top/bottom or sides
      minZoom = Math.max($("#map-holder").width() / w, $("#map-holder").height() / h);
      // set max zoom to a suitable factor of this value
      maxZoom = 20 * minZoom;
      // set extent of zoom to chosen values
      // set translate extent so that panning can't cause map to move out of viewport
      zoom
        .scaleExtent([minZoom, maxZoom])
        .translateExtent([[0, 0], [w, h]])
        ;
      // define X and Y offset for centre of map to be shown in centre of holder
      var midX = ($("#map-holder").width() - minZoom * w) / 2;
      var midY = ($("#map-holder").height() - minZoom * h) / 2;
      // change zoom transform to min zoom and centre offsets
      svg.call(zoom.transform, d3.zoomIdentity.translate(midX, midY).scale(minZoom));
    }

    // zoom to show a bounding box, with optional additional padding as percentage of box size
    function boxZoom(box, centroid, paddingPerc) {
      var minXY = box[0];
      var maxXY = box[1];
      // find size of map area defined
      var zoomWidth = Math.abs(minXY[0] - maxXY[0]);
      var zoomHeight = Math.abs(minXY[1] - maxXY[1]);
      // find midpoint of map area defined
      var zoomMidX = centroid[0];
      var zoomMidY = centroid[1];
      // increase map area to include padding
      zoomWidth = zoomWidth * (1 + paddingPerc / 100);
      zoomHeight = zoomHeight * (1 + paddingPerc / 100);
      // find scale required for area to fill svg
      var maxXscale = $("svg").width() / zoomWidth;
      var maxYscale = $("svg").height() / zoomHeight;
      var zoomScale = Math.min(maxXscale, maxYscale);
      // handle some edge cases
      // limit to max zoom (handles tiny countries)
      zoomScale = Math.min(zoomScale, maxZoom);
      // limit to min zoom (handles large countries and countries that span the date line)
      zoomScale = Math.max(zoomScale, minZoom);
      // Find screen pixel equivalent once scaled
      var offsetX = zoomScale * zoomMidX;
      var offsetY = zoomScale * zoomMidY;
      // Find offset to centre, making sure no gap at left or top of holder
      var dleft = Math.min(0, $("svg").width() / 2 - offsetX);
      var dtop = Math.min(0, $("svg").height() / 2 - offsetY);
      // Make sure no gap at bottom or right of holder
      dleft = Math.max($("svg").width() - w * zoomScale, dleft);
      dtop = Math.max($("svg").height() - h * zoomScale, dtop);
      // set zoom
      svg
        .transition()
        .duration(500)
        .call(
          zoom.transform,
          d3.zoomIdentity.translate(dleft, dtop).scale(zoomScale)
        );
    }




    // on window resize
    $(window).resize(function () {
      // Resize SVG
      svg
        .attr("width", $("#map-holder").width())
        .attr("height", $("#map-holder").height())
        ;
      initiateZoom();
    });

    // create an SVG
    var svg = d3
      .select("#map-holder")
      .append("svg")
      // set to the same size as the "map-holder" div
      .attr("width", $("#map-holder").width())
      .attr("height", $("#map-holder").height())
      // add zoom functionality
      .call(zoom)


    // get map data

    // function(a) {
    // console.log(a);
    //Bind data and create one path per GeoJSON feature
    var countriesGroup = svg.append("g").attr("id", "map");
    // add a background rectangle
    countriesGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", w)
      .attr("height", h);

    // draw a path for each feature/country
    var countries = countriesGroup
      .selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("id", function (d, i) {
        return "country" + d.properties.iso_a3;
      })
      .attr("class", "country")
      //      .attr("stroke-width", 10)
      //      .attr("stroke", "#ff0000")
      // add a mouseover action to show name label for feature/country
      // .on("mouseover", function(d, i) {
      //     d3.select("#countryLabel" + d.properties.iso_a3).style("display", "block");
      // })
      // .on("mouseout", function(d, i) {
      //     d3.select("#countryLabel" + d.properties.iso_a3).style("display", "none");
      // })
      // add an onclick action to zoom into clicked country
      .on("click", function (d, i) {
        d3.selectAll(".country").classed("country-on", false);
        d3.select(this).classed("country-on", true);
        boxZoom(path.bounds(d), path.centroid(d), 20);
      });
    // Add a label group to each feature/country. This will contain the country name and a background rectangle
    // Use CSS to have class "countryLabel" initially hidden
    var countryLabels = countriesGroup
      .selectAll("g")
      .data(json.features)
      .enter()
      .append("g")
      .attr("class", "countryLabel")
      .attr("id", function (d) {
        return "countryLabel" + d.properties.iso_a3;
      })
      .attr("transform", function (d) {
        return (
          "translate(" + path.centroid(d)[0] + "," + path.centroid(d)[1] + ")"
        );
      })
      // add mouseover functionality to the label
      //   .on("mouseover", function(d, i) {
      //       d3.select(this).style("display", "block");
      //   })
      //   .on("mouseout", function(d, i) {
      //        d3.select(this).style("display", "none");
      //  })
      // add an onlcick action to zoom into clicked country
      .on("click", function (d, i) {
        d3.selectAll(".country").classed("country-on", false);
        d3.select("#country" + d.properties.iso_a3).classed("country-on", true);
        boxZoom(path.bounds(d), path.centroid(d), 20);
      });
    // add the text to the label group showing country name
    countryLabels
      .append("text")
      .attr("class", "countryName")
      .style("text-anchor", "middle")
      .attr("dx", 0)
      .attr("dy", 0)
      .text(function (d) {
        return d.properties.name;
      })
      .call(getTextBox);
    // add a background rectangle the same size as the text
    countryLabels
      .insert("rect", "text")
      .attr("class", "countryLabelBg")
      .attr("transform", function (d) {
        return "translate(" + (d.bbox.x - 2) + "," + d.bbox.y + ")";
      })
      .attr("width", function (d) {
        return d.bbox.width + 4;
      })
      .attr("height", function (d) {
        return d.bbox.height;
      });
    initiateZoom();
    // }

  }
}
