import { Component, OnInit, Input, ElementRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { DragulaService } from 'ng2-dragula'
import { Subscription } from 'rxjs';


import { AngularDraggableDirective } from 'angular2-draggable';



@Component({
  selector: 'app-dragdropserver',
  templateUrl: './dragdropserver.component.html',
  styleUrls: ['./dragdropserver.component.scss']
})
export class DragdropserverComponent implements OnInit {

  vamps = [
    { name: "a", image: "../../../../assets/images/device/1u_black_front.png", backSide_image: "../../../../assets/images/device/1u_black_back.png" },
    { name: "b", image: "../../../../assets/images/device/1u_black_front.png", backSide_image: "../../../../assets/images/device/1u_black_back.png" },
    { name: "c", image: "../../../../assets/images/device/1u_black_front.png", backSide_image: "../../../../assets/images/device/1u_black_back.png" },
  ];
  vamps2 = [
    { name: "", image: "", id: '1', height: '1' }, { name: "", image: "", id: '2', height: '1' }, { name: "", image: "", id: '3', height: '1' },
    { name: "", image: "", id: '4', height: '1' }, { name: "", image: "", id: '5', height: '1' }, { name: "", image: "", id: '6', height: '1' },
    { name: "", image: "", id: '7', height: '1' }, { name: "", image: "", id: '8', height: '1' }, { name: "", image: "", id: '9', height: '1' },
    { name: "", image: "", id: '10', height: '1' },
  ];

  backSide: any = this.vamps2
  vamps3 = []
  reset: boolean = false

  constructor(private dragulaService: DragulaService) { }

  dragDropData: boolean = false
  subs = new Subscription();
  sizeOfDevice: any = [
    { size: 1, name: '1U' }, { size: 2, name: '2U' }, { size: 3, name: '3U' },
  ]








  ngOnInit() {
    this.dropDown()


    let a =  [{ "name": "", "image": "", "id": "3", "height": "1", "activate": false },
    { "name": "", "image": "", "id": "4", "height": "1", "activate": false },
    { "name": "a", "image": "../../../../assets/images/device/1u_black_front.png", "backSide_image": "../../../../assets/images/device/1u_black_back.png"
    },
    { "name": "b", "image": "../../../../assets/images/device/1u_black_front.png", "backSide_image": "../../../../assets/images/device/1u_black_back.png"
    },
    { "name": "", "image": "", "id": "5",  "height": "1",  "activate": false },
    { "name": "", "image": "",  "id": "6", "height": "1", "activate": false },
    { "name": "", "image": "", "id": "7", "height": "1", "activate": false },
    { "name": "",  "image": "", "id": "8", "height": "1", "activate": false },
    { "name": "","image": "","id": "9","height": "1","activate": false },
    { "name": "","image": "","id": "10","height": "1","activate": false }
    ]

let heightCal = {height:0,indexCh:0}
    let b = a.filter((item,index)=>{


      if(heightCal.height){
        if(index <= heightCal.indexCh + ( heightCal.height-1)){

          console.log(item);
          

        }else{
          heightCal.height=0
          heightCal.indexCh=0

        }

      }
      if(item.name && !heightCal.height){
        heightCal.height = item.height ? Number(item.height):2
        heightCal.indexCh = index
      }
    })




    // this.dragDropNewLofic()
    setTimeout(() => {
      this.dragDropData = true;
    }, 0);


    this.dragulaService.createGroup("RACKNAME", {
      revertOnSpill: false,   

      moves: function (el, source, handle, sibling) {
        let a = el.getAttribute("vamp")
        return a || a === null ? true : false; // elements are always draggable by default
      },
 
      accepts: (el, target, source, sibling) => {

        // let valueCheck =  el.getAttribute("checkHeight")
        // let a = el.getAttribute("vamp")

        // var index = $(".flex").prev().index(sibling);
        // var index = $(".flex").index(sibling);
        // console.log(index,sibling);

        // if(valueCheck){
        //   index < 0 ? index = 10 : index = index
        //   if(index <= 10){
        //     index = index + Number(valueCheck)
        //   }
        // }else{
        //     index < 0 ? index = 10 : index = index+2
        // }
        //   let condiotn = a === null ? "ok" : index <= 10 ? "ok":"notOk"    
        // return condiotn == "ok" ? true:false;
        return target.id !== 'left';;
      },


   
    });

    this.dragulaService.dropModel("RACKNAME").subscribe(args => {

      let totalData = JSON.parse(JSON.stringify(args.targetModel))
      console.log(totalData, this.vamps2 );
 
      let heightCheck = args.item
      let overRideValue = []
      if (heightCheck) {
        let heightCal = {height:0,indexCh:0}
        overRideValue = totalData.filter((item,index)=>{

          // console.log(totalData.length , index);

          //      
          
          if(heightCal.height && item.name){
            if(index <= heightCal.indexCh + ( heightCal.height-1)){
              return item
            }else{
              heightCal.height=0
              heightCal.indexCh=0
            }
          }


          if(heightCal.height){


            //height 2 m
            if( heightCal.indexCh + ( heightCal.height-1) >= totalData.length ){
                return item
            }

          }



          if(item.name && !heightCal.height){
            heightCal.height = item.height ? Number(item.height):1
            heightCal.indexCh = index
          }
          console.log(heightCal,totalData.length);

          if(heightCal.indexCh + ( heightCal.height-1) >= totalData.length){
            return item 
          }
        })
      }


      // return

      // for(let i=totalData.length-1; i>)


      if(overRideValue.length > 0 ){
        this.errorMesage = "Over Ride Device Not allowed "
        totalData = JSON.parse(JSON.stringify(this.vamps2))        
      }else{
        this.errorMesage  = ""
      }
        

      setTimeout(() => {

        // console.log(totalData.length);
        // let heightCal = {height:0,indexCh:0}

        for (let i = totalData.length - 1; i >= 0 ; i--) {

          
          totalData[i]['id'] = (i+1).toString()

          // if( totalData[i]['name']){
          //   heightCal['height'] = totalData[i]['height']
          //   heightCal['indexCh'] = i
          // }
          
          if (totalData.length > 10) {
            if (totalData[i]['name'] == "") {
              totalData.splice(i, 1);
            }
          }
        }
        this.vamps2 = totalData
        this.backSide = JSON.parse(JSON.stringify([...totalData, ...this.vamps3]))

        // console.log(this.vamps2);
        
      
      }, 0);

   




    });

    this.dragulaService.shadow("RACKNAME").subscribe((args) => {
      console.log(args);
    });

  }






  counter(i: number) {
    return new Array(i);
  }

  dropDownShow: boolean = false
  dropDown(row = null) {
    this.vamps2.forEach(item => {
      item['activate'] = false;
    })
    if (row) {
      row['activate'] = true;

    }
  }

  errorMesage: string = ''
  selectImage(row, device: any) {
    let indexCheck = this.vamps2.findIndex(x => x.name == row.name)
    if (indexCheck + device.size > 10) {
      this.errorMesage = "Size is not suitable for rack"
      return
    } else {
      this.errorMesage = ''
    }
    row['image'] = `../../../../assets/images/device/${device.size}u_black_front.png`;
    row['backSide_image'] = `../../../../assets/images/device/${device.size}u_black_back.png`;
    row['height'] = device.size
    // this.vamps2 = [...this.vamps2, ...this.vamps3]
    // this.backSide = JSON.parse(JSON.stringify(this.vamps2))

    // if (device.size > 1) {
    //   if (indexCheck >= 0) {
    //     let newDAta = this.vamps2.splice(10 - (device.size - 1), device.size - 1)
    //     this.vamps3 = newDAta
    //   }
    // } else {
    //   this.vamps3 = []
    // }

  }


  windowRefreesh() {
    window.location.reload();
  }


  // drag and drop new logic ------------------------------------------->>>>>>>>>>>>>>>>>>>>>.

  rackImage: any = [
    { name: "a", image: "../../../../assets/images/device/1u_black_front.png", backSide_image: "../../../../assets/images/device/1u_black_back.png" },
    { name: "b", image: "../../../../assets/images/device/1u_black_front.png", backSide_image: "../../../../assets/images/device/2u_black_back.png" },
    { name: "c", image: "../../../../assets/images/device/1u_black_front.png", backSide_image: "../../../../assets/images/device/3u_black_back.png" },
  ];
  dropRackImage: any = [
    { name: "", image: "", id: '1', height: '1' }, { name: "", image: "", id: '2', height: '1' }, { name: "", image: "", id: '3', height: '1' },
    { name: "", image: "", id: '4', height: '1' }, { name: "", image: "", id: '5', height: '1' }, { name: "", image: "", id: '6', height: '1' },
    { name: "", image: "", id: '7', height: '1' }, { name: "", image: "", id: '8', height: '1' }, { name: "", image: "", id: '9', height: '1' },
    { name: "", image: "", id: '10', height: '1' },
  ];

  dragDropNewLofic() {
    this.dragulaService.createGroup("SerVerRack", {
      moves: function (el, source, handle, sibling) {
        let a = el.getAttribute("vamp")
        return a || a === null ? true : false; // elements are always draggable by default
      },

      accepts: (el, target, source, sibling) => {

        // let valueCheck =  el.getAttribute("checkHeight")
        // let a = el.getAttribute("vamp")
        // var index = $(".flex").prev().index(sibling);

        // if(valueCheck){
        //   index < 0 ? index = 10 : index = index
        //   if(index <= 10){
        //     index = index + Number(valueCheck)
        //   }
        // }else{
        //     index < 0 ? index = 10 : index = index+2
        // }
        //   let condiotn = a === null ? "ok" : index <= 10 ? "ok":"notOk"    
        // return condiotn == "ok" ? true:false;
        return true;
      },

    });


    this.dragulaService.drop("SerVerRack").subscribe((args) => {
      console.log(args);
    });
    this.dragulaService.drag("SerVerRack").subscribe((args) => {
      // console.log(args,'drag');
    });



    this.dragulaService.dropModel("SerVerRack").subscribe(args => {
      console.log(args);

      setTimeout(() => {
        let totalData = JSON.parse(JSON.stringify(args.targetModel))
        for (let i = 0; i < totalData.length; i++) {
          if (totalData.length > 10) {
            if (totalData[i]['name'] == "") {
              totalData.splice(i, 1);
            }
          }
        }
        this.dropRackImage = totalData

      }, 0);

    });

  }





}
