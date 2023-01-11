import { Component, OnInit } from '@angular/core';
import * as htmlPDF from 'html2pdf.js';
// import * as html2pdf from 'html2pdf.js'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(
    ) {
      }


   ngOnInit(): void {
       this.toDataURL(`assets/images/pdf/image1.jpeg`, (image1, callback = null) => {
       this.toDataURL(`assets/images/pdf/image1.jpeg`, (image2, callback = null) => {
        this.downloadfile1(image1,image2,null,null, (d) => {
          if (callback) {
            callback(false);
          }
        }
        )
      })
      })
  }








  async downloadfile1(image1: any, image2: any, dataInfo, pdfInfo, callback = null) {
pdfInfo =   {
  margin:       [1,0.2], //[vMargin, hMargin], or [top, left, bottom, right].
  filename:     'output.pdf',
  image:        { type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 2 },
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
  pagebreak: { mode: 'avoid-all', after: '.avoidThisRow' }

};

dataInfo=['#capture1','#capture1','#capture1','#capture2']
// New 
    let headerHeight = 0.5;

    var totalHtmlIDs: any = '';

    await dataInfo.forEach(item => {

      let ab = $(item).clone(true).html()

      $(`${item} p`).css({ color: 'black', background: 'white' }).html()

      let dataConvert = $(item).html()

      if (dataConvert != undefined) {



        // <div style="border:1px solid black;float: left;margin:10px 2px; padding:10px 0 10px 5px"> </div>

        totalHtmlIDs += `<div class="clearfix" ></div>  <div style="border: 1px solid #C4C4C4;margin: 5px;" ></div>

         <div style="margin:10px 2px; padding:10px 0 10px 5px">

        ${dataConvert}

        </div> `;

      }

      $(item).empty()

      $(item).append(ab)

    })

    console.log(totalHtmlIDs, '---------');

    await htmlPDF().from(totalHtmlIDs).set(pdfInfo).toPdf().get('pdf').then(function (pdf) {

      var totalPages = pdf.internal.getNumberOfPages();

      for (var i = 1; i <= totalPages; i++) {

        pdf.setPage(i);

        // pdf.setFillColor(255, 255, 255);

        // pdf.setFontSize(10)

        // pdf.setTextColor(72, 61, 139)

        // pdf.rect(0, 0, 8.3, headerHeight, 'F');

        // pdf.text(3.7, 0.3, dataInfo.titleName, 'center');

        // pdf.text(dataInfo.currentDate, pdf.internal.pageSize.getWidth() - 0.2, 0.3, 'right');

        // pdf.addImage(image1, 'JPEG', 0.1, 0.1);

        // pdf.setLineWidth(0.01);

        // pdf.rect(0.15, 0.52, pdf.internal.pageSize.getWidth() - 0.3, pdf.internal.pageSize.getHeight() - 1);

        // pdf.setFontSize(10);

        // pdf.setTextColor(72, 61, 139);

        pdf.text('Page ' + i + ' of ' + totalPages, pdf.internal.pageSize.getWidth() - 5,

          pdf.internal.pageSize.getHeight() - 0.2);

        // pdf.text(dataInfo.created, pdf.internal.pageSize.getWidth() - 1.9,

          // pdf.internal.pageSize.getHeight() - 0.2);



        // if (totalPages == i) {

        //   pdf.addImage(image2, 'JPEG', 0.2, pdf.internal.pageSize.getHeight() - 0.4);

        // }

      }

    }).save()

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
  header(doc, image, headerHeight,pdfWidth) {
    doc.setFillColor(72, 61, 139);
    doc.rect(0, 0, pdfWidth, headerHeight, 'F');

    // doc.addImage(
    //   image,
    //   'JPEG',
    //   0,
    //   0.1,

    // );


  }
  fotter(doc, image, headerHeight,pdfWidth,pdfHeight) {
    doc.setFillColor(255, 255, 255);
    doc.rect(0, pdfHeight-0.5, pdfWidth, headerHeight+0.2, 'F');

    // doc.addImage(
    //   image,
    //   'JPEG',
    //   0,
    //   pdfHeight-0.5,

    // );
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(JSON.stringify(doc.getNumberOfPages()),pdfWidth/2,pdfHeight-0.2)


  }
  addTitle(doc, title, margint_top) {
    if (title) {

      let count = 0
      let moveX = 0
      for (let [i] of Object.entries(title)) {

        console.log(count);
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



  //   downloadfile3(image1: any,image2, callback = null) {
//     let headerHeight = 0.5;
//     let pdfWidth = 8.3
//     let pdfHeight = 11.7
//   //  return
//     var doc = new jsPDF('p', 'in', [pdfWidth,pdfHeight ]);
   




//     var html = $("#capture2").html();  
//     var opt = {
//   		margin:       [1,0.2], //[vMargin, hMargin], or [top, left, bottom, right].
//   		filename:     'output.pdf',
//   		image:        { type: 'jpeg', quality: 0.98 },
//   		html2canvas:  { scale: 2 },
//   		jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
// 	};
//  	// New Promise-based usage:
//   console.log(html);
  
// 	html2pdf().from(html).set(opt).save();


//     if (callback) {
//       callback();
//     }
//   }
//   downloadfile(image1: any,image2, callback = null) {
//     let headerHeight = 0.9;
//     let pdfWidth = 8.3
//     let pdfHeight = 11.7
//   //  return
//     var doc = new jsPDF('p', 'in', [pdfWidth,pdfHeight ]);
//     html2canvas(document.querySelector("#capture1"),{scale: 1.2,scrollX: 0,scrollY: 0, allowTaint: true, backgroundColor: '#fff'}).then(canvas1 => {
//     html2canvas(document.querySelector("#capture2"),{scale: 1.2,scrollX: 0,scrollY: 0, allowTaint: true, backgroundColor: '#fff'}).then(canvas2 => {
//       let totalData:any=[canvas1,canvas2]
//       let usePageHeight = 11.7
//       let nextImageHeight = 0.5
//       let canHeight = 0

//   for (let i=0;totalData.length>i;i++){
// if(i==0){
//   this.header(doc, image1, headerHeight,pdfWidth)

// }
//     let totalData1 = totalData[i]; let inch = 96 ;
//     if(i>0){
//       nextImageHeight = nextImageHeight + canHeight+1
//     }
//     canHeight = totalData1.height / inch // image height
//     let contentDataURL = totalData1.toDataURL('image/JPEG',1.0)

    
//     if(usePageHeight<canHeight){
//       let a = usePageHeight - canHeight

//       doc.addImage(contentDataURL,'PNG', 0,nextImageHeight-1 , pdfWidth,canHeight );
//       this.fotter(doc, image2, headerHeight,pdfWidth,pdfHeight)

//       console.log(a,usePageHeight ,canHeight);
      
//       doc.addPage()
//       this.header(doc, image1, headerHeight,pdfWidth)
//       this.fotter(doc, image2, headerHeight,pdfWidth,pdfHeight)

//       nextImageHeight = 0.5
//       usePageHeight = 11.7
//     }

    
//     usePageHeight = usePageHeight - canHeight  // free space use
//     console.log(usePageHeight,'--->' , canHeight);

//     doc.addImage(contentDataURL,'PNG', 0,nextImageHeight , pdfWidth,canHeight );
//   }
//   doc.save('grid.pdf');    

// });
//   });


//     if (callback) {
//       callback();
//     }
//   }






}
