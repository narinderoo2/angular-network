import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'network';

  constructor(private activate: ActivatedRoute) {

  }

  ngOnInit(): void {

    // return 
    this.toDataURL(`assets/images/pdf/image1.jpeg`, (dataUrl, callback = null) => {
      // this.downloadfile(dataUrl, (d) => {
      //   if (callback) {
      //     callback(false);
      //   }
      // }
      // )
    })

  }

  header(doc, imageHeader, headerHeight) {
    doc.setFillColor(72, 61, 139);
    doc.rect(0, 0, 8.3, headerHeight, 'F');

    doc.addImage(
      imageHeader,
      'JPEG',
      0.1,
      0,

    );


  }

  addTitle(doc, title, margint_top) {
    if (title) {

      let count = 0
      let moveX = 0
      for (let [i] of Object.entries(title)) {

        count = count + 1
        if (count > 2) {
          count = 0
          moveX = 0
          margint_top = margint_top + 0.5
        }

        doc.setFontSize(20);
        doc.setTextColor(0, 0, 0);
        doc.text(`${i}:${title[i]}`, 0.2 + moveX, margint_top);

        moveX = moveX + 4
      }

    }
  }



  downloadfile(imageHeader: any, callback = null) {
    let headerHeight = 0.9;
    var margint_top = headerHeight + 0.5;
    let data1 = [
      { 'name': 'rt', 'clasd': 'adsf', 'nibu': 'hiat', 'class': 'ptanhi' },
    ]
    var doc = new jsPDF('p', 'in', [8.3, 11.7]);
    this.header(doc, imageHeader, headerHeight)
    // data1.forEach(item => {
    //   this.addTitle(doc, item, margint_top)
    // })
    html2canvas(document.querySelector("#capture")).then(canvas => {
      // document.body.appendChild(canvas)
      doc.addImage(canvas,'PNG', 0, 0, 8.3, 0.6);
      doc.save('grid.pdf');      
  });


   
    if (callback) {
      callback();
    }
  }

  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

}
