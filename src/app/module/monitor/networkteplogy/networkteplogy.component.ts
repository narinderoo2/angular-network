import { Component, OnInit } from '@angular/core';
// declare let d3: any;
import * as d3 from "d3";
import { catchError, map, Subject, tap } from 'rxjs';
import { WebsocketService } from 'src/app/shared/websocket.service';
@Component({
    selector: 'app-networkteplogy',
    templateUrl: './networkteplogy.component.html',
    styleUrls: ['./networkteplogy.component.scss']
})
export class NetworkteplogyComponent implements OnInit {



    title = 'socketrv';
    content = '';
    received = [];
    sent = [];



    messages: any;
    deviceIcon = {
        'cloud': "./../../../assets/images/network/server.svg",
        'router': "./../../../assets/images/network/workstation.svg",
        'switch': "./../../../assets/images/network/switch.svg",
        'computer': "./../../../assets/images/network/wlan.svg",
        'database': "./../../../assets/images/network/database.svg",
        'mobile': "./../../../assets/images/network/smartphone.svg",

    }











    constructor(private websocketService: WebsocketService) {
        // websocketService.messages.subscribe(msg => {
        //     this.received.push(msg);
        //     console.log("Response from websocket: " + msg);
        //   });
    }


    ngOnInit(): void {
        this.showTepology()
        // this.webSocket()
    }



    showTepology() {
        let _this = this;
        const data = {
            name: "Cloud",
            value: 12,
            type: "cloud",
            children: [
                {
                    name: "Router1",
                    value: 40,
                    type: "router",
                    children: [
                        {
                            name: "Cisco",
                            value: 54,
                            type: "switch",
                            children: [
                                { name: "192.168.100.1", value: 12, type: "computer" },
                                {
                                    name: "192.168.100.2", value: 13,
                                    type: "computer",
                                    children: [
                                        { name: "192.168.100.3", value: 22, type: "computer" },
                                        { name: "192.168.100.4", value: 32, type: "computer" },
                                        { name: "192.168.100.5", value: 42, type: "computer" },
                                    ]
                                }
                            ]
                        },
                        {
                            name: "Switch",
                            value: 66,
                            type: "switch",
                            children: [
                                { name: "192.168.100.7", value: 5, type: "computer" },
                                { name: "192.168.100.8", value: 55, type: "computer" },

                            ]
                        },
                        {
                            name: "HP",
                            value: 80,
                            type: "switch",
                            children: [
                                { name: "192.168.100.9", value: 12, type: "computer" },
                            ]
                        }
                    ]
                },
                {
                    name: "Router2",
                    value: 90,
                    type: "router",
                    children: [
                        { name: "192.168.100.10", value: 12, type: "mobile" },
                    ]
                },
                {
                    name: "Router3",
                    value: 30,
                    type: "router",
                    children: [
                        { name: "192.168.100.11", value: 12, type: "mobile" },
                    ]
                },
            ]
        };

        const margin = { top: 10, right: 120, bottom: 10, left: 40 };
        const width = 960;
        const height = 560;
        const root = d3.hierarchy(data);
        const dx = 30;
        const dy = width / 6;
        const tree = d3.tree().nodeSize([dx, dy]);

        // let diagonal = d3.linkHorizontal()
        // .source((d) => [d.source[1], d.source[0]])
        // .target((d) => [d.target[1], d.target[0]]);

        const diagonal = d3.linkHorizontal()
            .x((d) => d.y)
            .y((d) => d.x);

        root.x0 = dy / 2;
        root.y0 = 10;

        var viewerWidth = $(document).width();
        var viewerHeight = $(document).height();


        root.descendants().forEach((d, i) => {
            d.id = i;
            d._children = d.children;
        });

        tree(root);

        const svg = d3
            .create("svg")
            .attr("viewBox", [-margin.left, -margin.top, width, dx])
            .attr("width", width)
            .attr("height", height)
            .style("font", "10px sans-serif")
            .style("user-select", "none")

        const g = svg.append("g");


        const gLink = g
            .append("g")
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("width", "4.31em")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", 2.5)


        const gNode = g
            .append("g")
            .attr("cursor", "pointer")
            .attr("pointer-events", "all");


        const zoom = d3.zoom()
            .scaleExtent([0.1, 3])
            .on("zoom", zoomed);


        function zoomed(event) {
            const { transform } = event;
            g.attr("transform", transform);
            g.attr("stroke-width", 1 / transform.k);
        }

        svg.call(zoom);
        update(root);

        document.querySelector("#app").appendChild(svg.node());

        function update(source) {
            const duration = 350;
            const nodes = root.descendants().reverse();
            const links = root.links();

            // Compute the new tree layout.

            let left = root;
            let right = root;
            root.eachBefore((node) => {
                if (node.x < left.x) left = node;
                if (node.x > right.x) right = node;
            });

            const height = right.x - left.x + margin.top + margin.bottom;

            const transition = svg
                .transition()
                .duration(duration)
                .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
                .tween(
                    "resize",
                    window.ResizeObserver ? null : () => () => svg.dispatch("toggle")
                );




            // Update the nodes…
            const node = gNode.selectAll("g").data(nodes, (d) => d.id);

            // Enter any new nodes at the parent's previous position.
            const nodeEnter = node
                .enter()
                .append("g")
                .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0)
                .on("click", (event, d) => {
                    d.children = d.children ? null : d._children;
                    update(d);
                })

            nodeEnter
                .append("circle")
                .attr("r", 10.5)
                .attr("fill", 'white')
                .attr("stroke-width", 100)

            nodeEnter.append("image")
                .attr("xlink:href", (d) => _this.deviceIcon[d.data.type])
                .attr("x", -8)
                .attr("y", -8)
                .attr("width", 16)
                .attr("height", 16)

            nodeEnter
                .append("circle")
                .attr("r", 3)
                .attr("cy", -5)
                .attr("cx", 7)
                .attr("fill", (d) => checkColor(d, 'node'))
                .attr("stroke-width", 100)



            nodeEnter
                .append("text")
                .attr("dy", "0.31em")
                .attr("x", (d) => (d._children ? -20 : 10))
                .attr("text-anchor", (d) => (d._children ? "end" : "start"))
                .text((d) => d.data.name)
                .clone(true)
                .lower()
                .attr("stroke-linejoin", "round")
                .attr("stroke-width", 3)
                .attr("stroke", "white");

            // Transition nodes to their new position.
            node
                .merge(nodeEnter)
                .transition(transition)
                .attr("transform", (d) => `translate(${d.y},${d.x})`)
                .attr("fill-opacity", 1)
                .attr("stroke-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            node
                .exit()
                .transition(transition)
                .remove()
                .attr("transform", (d) => `translate(${source.y},${source.x})`)
                .attr("fill-opacity", 0)
                .attr("stroke-opacity", 0);

            // Update the links…
            const link = gLink.selectAll("path").data(links, (d) => d.target.id);

            // Enter any new links at the parent's previous position.
            const linkEnter = link
                .enter()
                .append("path")
                .attr("d", (d) => {
                    const o = { x: source.x0, y: source.y0 };
                    console.log(o);

                    return diagonal({ source: o, target: o });
                });

            linkEnter
                .attr('stroke', (d) => checkColor(d, 'link'))
            // .attr('stroke','rgb(132, 230, 25)')
        

            // Transition links to their new position.
            link.merge(linkEnter).transition(transition).attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link
                .exit()
                .transition(transition)
                .remove()
                .attr("d", (d) => {
                    const o = { x: source.x, y: source.y };
                    return diagonal({ source: o, target: o });
                });

            // Stash the old positions for transition.
            root.eachBefore((d) => {
                d.x0 = d.x;
                d.y0 = d.y;
            });

            function checkColor(data, tag) {
                let value;
                if (tag == 'node') {
                    value = data.data.value
                } else {
                    value = data.target.data.value ? data.target.data.value : 0
                }
                let color: string;

                switch (true) {
                    case value <= 10:
                        color = '61, 230, 25';
                        break;
                    case value <= 20:
                        color = "132, 230, 25";
                        break;
                    case value <= 30:
                        color = "150, 230, 25";
                        break;
                    case value <= 40:
                        color = "185, 230, 25";
                        break;
                    case value <= 50:
                        color = "221, 230, 25";
                        break;
                    case value <= 60:
                        color = "230, 203, 25";
                        break;
                    case value <= 70:
                        color = "230, 167, 25";
                        break;
                    case value <= 80:
                        color = "230, 114, 25";
                        break;
                    case value <= 90:
                        color = "230, 96, 25";
                        break;
                    case value <= 100:
                        color = "230, 43, 25";
                        break;
                }
                return `rgb(${color})`
            }



        }
    }



    cHAT_URL = "ws://localhost:8000/ws/test/";
    webSocket() {

        this.websocketService.connect(this.cHAT_URL)

        let data = {
            data: 'ptanhi'
        }
        this.websocketService.send(data)


        this.websocketService.messages$.subscribe(res => {
            console.log(res);

        })
    }




}
