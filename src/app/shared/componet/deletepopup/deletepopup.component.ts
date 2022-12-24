import { Component, ElementRef, Input, OnInit, ViewChild ,AfterViewInit, Output,EventEmitter} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-deletepopup',
  templateUrl: './deletepopup.component.html',
  styleUrls: ['./deletepopup.component.scss']
})
export class DeletepopupComponent implements OnInit,AfterViewInit {
  @ViewChild("deletePopUp", { static: false }) openPopup: ElementRef;
  @Input() deleteData: {name:string, url:string, confirmParms?:any };
  @Output() deleteOutput = new EventEmitter();
  modalReference$:any
  deleteDescription:any[]=[];



  constructor(private modalService:NgbModal) { }


  ngAfterViewInit(){
    this.openpopUp()

  }
  ngOnInit(): void {
    console.log('---');
    
  }

  openpopUp(){
    this.modalReference$ = this.modalService.open(this.openPopup, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'm-content ',
    });



    this.modalReference$.result.then(
      (result)=>{},
      (reason) =>{ this.deleteOutput.emit({popUp:'close'})
      }
    )

    // deleteOutput
  }
  deleteUrl(data){

  }

}
