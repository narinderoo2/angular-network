import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dragdropserver',
  templateUrl: './dragdropserver.component.html',
  styleUrls: ['./dragdropserver.component.scss']
})
export class DragdropserverComponent implements OnInit {

  vamps = [
    {name: "a" , image: "../../../../assets/images/device/1u_black_front.png", backSide_image:"../../../../assets/images/device/1u_black_back.png" },
    { name: "b" ,image: "../../../../assets/images/device/1u_black_front.png",backSide_image:"../../../../assets/images/device/2u_black_back.png"  },
    { name: "c" ,image: "../../../../assets/images/device/1u_black_front.png",backSide_image:"../../../../assets/images/device/3u_black_back.png"  },

  ];

  vamps2 = [
    { name: "" ,image:"",id:'1',height:'1'}, { name: "" ,image:"",id:'2',height:'1'},  { name: "",image:"",id:'3',height:'1' },
    { name: "" ,image:"",id:'4',height:'1'}, { name: "" ,image:"",id:'5',height:'1'},  { name: "",image:"",id:'6',height:'1' },
    { name: "" ,image:"",id:'7',height:'1'}, { name: "" ,image:"",id:'8',height:'1'},  { name: "",image:"",id:'9',height:'1' }, 
    { name: "",image:"",id:'10',height:'1' } , 
  ];

  backSide:any = this.vamps2

  vamps3=[ ]

  constructor(private dragulaService: DragulaService) {
    // use these if you want

  
  }

  dragDropData:boolean=false


  subs = new Subscription();
sizeOfDevice:any=[
  {size:1,name:'1U'}, {size:2,name:'2U'},  {size:3,name:'3U'}, 
]



  

  ngOnInit() {
    this.dropDown()


    setTimeout(() => {
      this.dragDropData = true;

    }, 0);
    
  

  
this.dragulaService.createGroup("VAMPIRES", {

  // removeOnSpill: true,

  moves: function (el, source, handle, sibling) {
    let a = el.getAttribute("vamp")
    return a || a === null ? true:false; // elements are always draggable by default
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

 
 


this.dragulaService.dropModel("VAMPIRES").subscribe(args => {
  console.log(args);

  setTimeout(() => {
    let totalData = JSON.parse(JSON.stringify(args.targetModel)) 
    for(let i=0;i<totalData.length;i++){
      if(totalData.length > 10){
        if(totalData[i]['name'] == ""){
          totalData.splice(i, 1); 
        }
      }   
      }  
    this.vamps2 =    totalData
     this.backSide = JSON.parse(JSON.stringify([...totalData, ...this.vamps3  ] ))
     
  }, 0);

});


this.dragulaService.drop("VAMPIRES").subscribe((args) => {
  console.log(args);
});
this.dragulaService.drag("VAMPIRES").subscribe((args) => {
  // console.log(args,'drag');
});

  }

  counter(i: number) {
    return new Array(i);
}





dropDownShow:boolean=false
dropDown(row=null){
  this.vamps2.forEach(item => {
    item['activate']=false;
    // item['height']=1
  })
  if(row){
    row['activate']=true;

  }  
}

errorMesage:string=''
selectImage(row, device:any){

  console.log(row, device, this.vamps2);
 
  let indexCheck = this.vamps2.findIndex(x => x.name == row.name)

 console.log( indexCheck, indexCheck+device.size)
  

  if(indexCheck+device.size > 10){

    this.errorMesage = "Size is not suitable for rack"
    return 
  }else{
    this.errorMesage = ''
  }

  // return
  row['image']=`../../../../assets/images/device/${device.size}u_black_front.png`;
  row['backSide_image']=`../../../../assets/images/device/${device.size}u_black_back.png`;
  row['height']=device.size
  this.vamps2 =  [...this.vamps2, ...this.vamps3]
  this.backSide = JSON.parse(JSON.stringify(this.vamps2))

  if(device.size > 1){
    

  // let indexCheck = this.vamps2.findIndex(x => x.name == row.name)

  if(indexCheck >= 0){
    let newDAta = this.vamps2.splice(10-(device.size-1),device.size-1)
    this.vamps3 = newDAta    
  }

  }else{
   
    this.vamps3 = []
  }
  
}


windowRefreesh(){
  window.location.reload();
}

}
