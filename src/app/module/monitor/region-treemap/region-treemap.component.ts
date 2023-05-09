import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-region-treemap',
  templateUrl: './region-treemap.component.html',
  styleUrls: ['./region-treemap.component.scss']
})
export class RegionTreemapComponent implements OnInit {

  newData = [
    {
      "host_name": "192.168.100.84",
      "host_ip": "192.168.100.84",
      "count": 3387,
      "service_problem": {
        "warning": 0,
        "critical": 3387
      }
    },
    {
      "host_name": "juniper_sw1",
      "host_ip": "172.20.1.2",
      "count": 352,
      "service_problem": {
        "warning": 2,
        "critical": 2
      }
    },
    {
      "host_name": "192.168.100.170",
      "host_ip": "192.168.100.170",
      "count": 281,
      "service_problem": {
        "warning": 277,
        "critical": 4
      }
    },
    {
      "host_name": "Server170",
      "host_ip": "192.168.100.170",
      "count": 172,
      "service_problem": {
        "warning": 164,
        "critical": 8
      }
    },
    {
      "host_name": "BCCS_PH-7_LAN_SW_2",
      "host_ip": "192.168.100.253",
      "count": 106,
      "service_problem": {
        "warning": 40,
        "critical": 106
      }
    },
    {
      "host_name": "Mikrotik2",
      "host_ip": "22.22.22.2",
      "count": 48,
      "service_problem": {
        "warning": 1,
        "critical": 48
      }
    },
    {
      "host_name": "Router5",
      "host_ip": "10.10.10.2",
      "count": 47,
      "service_problem": {
        "warning": 2,
        "critical": 47
      }
    },
    {
      "host_name": "Mikrotik",
      "host_ip": "21.21.21.2",
      "count": 47,
      "service_problem": {
        "warning": 2,
        "critical": 147
      }
    },
    {
      "host_name": "Router6",
      "host_ip": "14.14.14.2",
      "count": 45,
      "service_problem": {
        "warning": 10,
        "critical": 45
      }
    },
    {
      "host_name": "Router2",
      "host_ip": "9.9.9.2",
      "count": 42,
      "service_problem": {
        "warning": 0,
        "critical": 42
      }
    },
    {
      "host_name": "DCCoreSw1.eisi",
      "host_ip": "172.16.1.2",
      "count": 39,
      "service_problem": {
        "warning": 440,
        "critical": 39
      }
    },
    {
      "host_name": "Router1.eisi",
      "host_ip": "192.168.100.51",
      "count": 39,
      "service_problem": {
        "warning": 0,
        "critical": 39
      }
    },
    {
      "host_name": "192.168.100.47",
      "host_ip": "192.168.100.47",
      "count": 12,
      "service_problem": {
        "warning": 0,
        "critical": 12
      }
    },
    {
      "host_name": "juniper_sw2",
      "host_ip": "172.21.1.2",
      "count": 9,
      "service_problem": {
        "warning": 0,
        "critical": 9
      }
    },
    {
      "host_name": "192.168.100.5",
      "host_ip": "192.168.100.5",
      "count": 9,
      "service_problem": {
        "warning": 3,
        "critical": 6
      }
    },
    {
      "host_name": "Server172",
      "host_ip": "192.168.100.172",
      "count": 6,
      "service_problem": {
        "warning": 1,
        "critical": 5
      }
    },
    {
      "host_name": "trendtest",
      "host_ip": "1.2.3.4",
      "count": 6,
      "service_problem": {
        "warning": 0,
        "critical": 6
      }
    },
    {
      "host_name": "192.168.100.39",
      "host_ip": "192.168.100.39",
      "count": 6,
      "service_problem": {
        "warning": 3,
        "critical": 3
      }
    },
    {
      "host_name": "192.168.100.34",
      "host_ip": "192.168.100.34",
      "count": 5,
      "service_problem": {
        "warning": 0,
        "critical": 5
      }
    },
    {
      "host_name": "my_host",
      "host_ip": "192.168.100.4",
      "count": 5,
      "service_problem": {
        "warning": 0,
        "critical": 5
      }
    },
    {
      "host_name": "192.168.100.2",
      "host_ip": "192.168.100.2",
      "count": 3,
      "service_problem": {
        "warning": 0,
        "critical": 3
      }
    },
    {
      "host_name": "192.168.100.4",
      "host_ip": "192.168.100.4",
      "count": 3,
      "service_problem": {
        "warning": 0,
        "critical": 3
      }
    },
    {
      "host_name": "testservice",
      "host_ip": "1.2.4.5",
      "count": 2,
      "service_problem": {
        "warning": 0,
        "critical": 2
      }
    },
    {
      "host_name": "test_host",
      "host_ip": "1.2.3.4",
      "count": 2,
      "service_problem": {
        "warning": 0,
        "critical": 2
      }
    },
    {
      "host_name": "servicetrend",
      "host_ip": "192.168.100.36",
      "count": 2,
      "service_problem": {
        "warning": 0,
        "critical": 2
      }
    },
    {
      "host_name": "mapHost",
      "host_ip": "192.168.100.33",
      "count": 2,
      "service_problem": {
        "warning": 0,
        "critical": 2
      }
    },
    {
      "host_name": "map2",
      "host_ip": "192.168.100.50",
      "count": 2,
      "service_problem": {
        "warning": 0,
        "critical": 2
      }
    },
    {
      "host_name": "192.168.100.71",
      "host_ip": "192.168.100.71",
      "count": 2,
      "service_problem": {
        "warning": 0,
        "critical": 2
      }
    },
    {
      "host_name": "host33",
      "host_ip": "192.168.100.33",
      "count": 2,
      "service_problem": {
        "warning": 0,
        "critical": 2
      }
    },
    {
      "host_name": "downtime_test_host",
      "host_ip": "2.3.4.5",
      "count": 2,
      "service_problem": {
        "warning": 0,
        "critical": 2
      }
    }
  ]



  constructor() { }

  ngOnInit(): void {
    // this.drillDownTreeMap()
    this.dataModify(this.newData)
  }

  downloadReport() {

    const svg = document.querySelector("svg");
    if (svg) {
      let pdfData = []
      let that = this;
      var serializer = new XMLSerializer();
      var svgString = serializer.serializeToString(svg);
      this.svgString2Image(svgString, 2 * 650, 500, 'png', save); // passes Blob and filesize String to the callback
      let keyChange = ''
      let data: any = []

    }


    function save(base64) {
      console.log(base64);



    }


  }

  svgString2Image(svgString, width, height, format, callback) {
    var format = format ? format : 'png';
    var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))); // Convert SVG string to data URL
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    var image = new Image();
    image.onload = function () {
      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      const dataURL = canvas.toDataURL();
      canvas.toBlob(function (blob: any) {
        if (callback) callback(dataURL, blob);
      });
    };
    image.src = imgsrc;
  }



  drillDownTreeMap(mapData) {
    let parentDiv = document.getElementById("parentDiv");


    let data = mapData
    let margin = { top: 30, right: 0, bottom: 0, left: 0 },
      width = parentDiv.clientWidth,
      height = parentDiv.clientHeight - 40,
      formatNumber = d3.format(",d"),
      transitioning;

    let x = d3.scaleLinear()
      .domain([0, width])
      .range([0, width]);

    let y = d3.scaleLinear()
      .domain([0, height - margin.top - margin.bottom])
      .range([0, height - margin.top - margin.bottom]);


    let color = d3.scaleOrdinal()
      .range(['#3B93A5', '#F7B844', '#ADD8C7', '#EC3C65', '#CDD7B6', '#C1F666', '#D43F97', '#1E5D8C', '#421243', '#7F94B0', '#EF6537', '#C0ADDB']);
    // .range([`#383867`, `#584c77`, `#33431e`, `#a36629`, `#92462f`, `#b63e36`, `#b74a70`, `#946943`]);
    // .range(d3.schemeCategory10.map(function(c) { c = d3.rgb(c); c.opacity = 1; return c; }));


    let treemap;
    var tooltip;
    let svg, grandparent;

    function updateDrillDown() {

      if (svg) {
        svg.selectAll("*").remove();
      } else {



        svg = d3.select("#treemapDrillDown").append("svg")
          .attr("width", '100%')
          .attr("height", '100%')
          .style("margin-left", -margin.left + "px")
          .style("margin.right", -margin.right + "px")
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .style("shape-rendering", "crispEdges");



        grandparent = svg.append("g")
          .attr("class", "grandparent")


        grandparent.append("rect")
          .attr("y", -margin.top)
          .attr("width", width)
          .attr("height", margin.top)
          .style("fill", "transparent")


        grandparent.append("text")
          .attr("x", 6)
          .attr("y", 6 - margin.top)
          .attr("dy", ".75em")
          .style("fill", "var(--text-color)")



        treemap = d3.treemap()
          .size([width, height])
          .round(false)
          .paddingInner(1);
      }


      let root = d3.hierarchy(data)
        .eachBefore(function (d) { d.id = (d.parent ? d.parent.id + "." : "") + d.data.shortName; })
        .sum((d) => d.size)
        .sort(function (a, b) {
          return b.height - a.height || b.value - a.value;
        });


      initialize(root);
      accumulate(root);
      layout(root);
      treemap(root);
      display(root);
    };



    let initialize = (root) => {
      root.x = root.y = 0;
      root.x1 = width;
      root.y1 = height;
      root.depth = 0;
    }

    let accumulate = (d) => {
      return (d._children = d.children)
        ? d.value = d.children.reduce(function (p, v) { return p + accumulate(v); }, 0)
        : d.value;
    }

    let layout = (d) => {
      if (d._children) {
        d._children.forEach(c => {
          c.x0 = d.x0 + c.x0 * d.x1;
          c.y0 = d.y0 + c.y0 * d.y1;
          c.x1 *= d.x1;
          c.y1 *= d.y1;
          c.parent = d;
          layout(c);
        });
      }
    }


    // create a tooltip
    var tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '5px')
      .style('padding', '5px')



    let display = (d) => {
      grandparent
        .datum(d.parent)
        .on("click", (event, d) => {
          transition(d,)
        })
        .select("text")
        .text(name(d));



      var g1 = svg.insert("g", ".grandparent")
        .datum(d)
        .attr("class", "depth");

      var g = g1.selectAll("g")
        .data(d._children)
        .enter().append("g")
        .on("click",(d,index)=>{console.log(d,index);
          transition(index,'data')
        });

      g.filter(d => d._children)
        .classed("children", true)
        .on("click", (event, d) => {
          console.log(d,'--');
          
          transition(d)
        })

      // var children = g.selectAll(".child")
      //   .data(function (d) { return d._children || [d]; })
      //   .enter().append("g");

      // children.append("rect")
      //     .attr("class", "child")
      //     .call(rect)
      //     .style("display",'none')
      //   .append("title")

      //     .text(function(d) { return d.data.shortName; });

      // children.append("text")
      //     .attr("class", "ctext")
      //     .style("display",'none')
      //     .text(function(d) { return d.data.shortName; })
      //     .call(text2);

      g.append("rect")
        .attr("class", "parent")
        .call(rect)
        .style('fill', d.color)
        .style('cursor', (dd) => dd.depth == 1 ? 'pointer' : '')
        .on('mouseover', function (dd, index, ele) {
          ((index.x1 - index.x0) < 80 && index.depth == 1) || (index.value * 100 / index.parent.value) < 10 && index.depth > 1 ?
            tooltip.style('visibility', 'visible') : '';
        })
        .on('mousemove', function (dd, index, ele) {
          ((index.x1 - index.x0) < 80 && index.depth == 1) || (index.value * 100 / index.parent.value) < 10 && index.depth > 1 ?
            tooltip
              .style('top', dd.y - 40 + 'px')
              .style('left', index.x1 - index.x0 > 300 ? dd.x + 'px' : dd.x - 150 + 'px')
              .text(`${index.data.shortName} (${index.value})`) : ''
        })
        .on('mouseout', function () {
          tooltip.style('visibility', 'hidden');
        });


      var t = g.append("text")
        .attr("class", "ptext")
        .attr("dy", ".75em")
        .style("overflow", "visible")
        .style("display", (dd) => {
          if (dd.depth == 1) {
            return (dd.x1 - dd.x0) > 80 ? 'block' : 'none';
          } else if (dd.value == 0) {
            return 'none';
          } else {
            // if(dd.depth >1 && (dd.parent.value - dd.value) > 5){
            //   return "block"
            // }else{
            return 'block';
            // }
          }
        })
        .style("fill", "white")


      t.append("tspan")
        .text((d) => d.depth == 1 ? `Host ( ${add3Dots(d.data.shortName, 12)})` : add3Dots(d.data.shortName, 12));


      t.append("tspan")
        .attr("dy", "1.5em")
        .text((d) => {
          if (d.data.ip != d.data.shortName && d.depth == 1) {
            return `IP (${d.data.ip}) `
          }
        });


      t.append("tspan")
        .attr("dy", "1.5em")
        .text((d) => `Alerts (${formatNumber(d.value)})`);
      t.call(text);

      g.selectAll("rect")
        .style("fill", (dd) => {
          if (d && d.color) {
            if (dd.data.shortName == "critical") {
              return "#E62E2D";
            } else if (dd.data.shortName == "warning") {
              return '#F6D600';
            } else {
              return d.color;
            }
          } else {
            let colors = color(dd.data.shortName);
            dd.color = colors;
            return colors;
          }
        });


      let transition = (d,tag:string = null) => {
        if (transitioning || !d) return;
        transitioning = true;
        if(tag){
          d = d.parent.parent
        }

        var g2 = display(d),
          t1 = g1.transition().duration(750),
          t2 = g2.transition().duration(750);

        x.domain([d.x0, d.x1]);
        y.domain([d.y0, d.y1]);

        // Enable anti-aliasing during the transition.
        svg.style("shape-rendering", null);

        // Draw child nodes on top of parent nodes.
        svg.selectAll(".depth").sort(function (a, b) {
          return a.depth - b.depth;
        });

        // Fade-in entering text.
        g2.selectAll("text").style("fill-opacity", 0);

        // Transition to the new view.
        t1.selectAll("text").call(text).style("fill-opacity", 0);
        t2.selectAll("text").call(text).style("fill-opacity", 1);
        t1.selectAll("rect").call(rect);
        t2.selectAll("rect").call(rect);

        // Remove the old node when the transition is finished.
        t1.remove().on("end", function () {
          svg.style("shape-rendering", "crispEdges");
          transitioning = false;
        });
      }
      return g;
    }

    let add3Dots = (string, limit) => {
      var dots = "...";
      if (string.length > limit) {
        string = string.substring(0, limit) + dots;
      }
      return string;
    }

    let text = (text) => {
      text.selectAll("tspan")
        .attr("x", (d) => x((d.x0) + ((d.x1 - d.x0) / 2)) - 30)
      text.attr("x", (d) => x((d.x0) + ((d.x1 - d.x0) / 2)) - 30)
        .attr("y", (d) => y((d.y0) + ((d.y1 - d.y0) / 2)) - 10)
        .style('cursor', (dd) => dd.depth == 1 ? 'pointer' : '')
        .style('font-size', (dd) => {
          if (dd.depth == 1) {
            return (dd.x1 - dd.x0) < 80 ? '0.3em' : (dd.x1 - dd.x0) < 200 ? '0.5em' : (dd.x1 - dd.x0) < 300 ? '0.8em' : ''
          } else {
            if ((dd.value * 100 / dd.parent.value) > 10) {
              return ''
            } else {
              return '0em'
            }
          }
        })
    }

    // function text2(text) {
    //   text.attr("x", function (d) { return x(d.x0 + d.x1) - this.getComputedTextLength() - 6; })
    //     .attr("y", function (d) { return y(d.y0 + d.y1) - 6; })
    //     .style("opacity", function (d) { return this.getComputedTextLength() < x(d.x0 + d.x1) - x(d.x0) ? 1 : 0; });
    // }

    let rect = (rect) => {
      rect.attr("x", d => x(d.x0))
        .attr("y", d => y(d.y0))
        .attr("fill", d => d._children ? "#ccc" : "#ddd");
      rect.attr("width", d => x(d.x1) - x(d.x0))
        .attr("height", d => y(d.y1) - y(d.y0))


    }

    let name = (d) => {
      return d.parent
        ? name(d.parent) + " / " + d.data.shortName + " (" + formatNumber(d.value) + ")"
        : d.data.shortName + " (" + formatNumber(d.value) + ")";
    }

    updateDrillDown();
  }





  hostState = {
    '0': 'UP', '1': 'Down', '2': 'Unreachable', '3': 'In Downtime'
  }
  serviceState = {
    '0': 'UP', '1': 'Warning', '2': 'Critical', '3': 'Unknown'
  }

  servicetype = []

  getUniqueListBy(arr) {
    return [...new Map(arr.map(item => [item['name'], item])).values()]
  }
  dataModify(item) {


    let data: any = {
      "shortName": `Top ${item.length} Alerts`,
      "children": []
    }
    if (item.length > 0) {
      item.forEach(row => {
        let creatHost: any = {
          "ip": row.host_ip,
          "shortName": row.host_name,
          "size": null,
          "children": []
        }
        for (let key1 in row.service_problem) {
          creatHost.children.push({
            "ip": row.host_ip,
            "shortName": key1,
            "size": row.service_problem[key1],
            "children": []
          })
        }
        data.children.push(creatHost)
      })
    }


    this.drillDownTreeMap(data)



  }



}
