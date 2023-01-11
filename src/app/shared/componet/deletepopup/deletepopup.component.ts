import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subscription } from 'rxjs';
import { CommonApiServiceService } from '../../services/common-api-service.service';


export interface deleteInput {
  name: string,
  url: string,
  confirmParms: string
}

@Component({
  selector: 'app-deletepopup',
  templateUrl: './deletepopup.component.html',
  styleUrls: ['./deletepopup.component.scss']
})
export class DeletepopupComponent implements OnInit, AfterViewInit {
  @ViewChild("deletePopUp", { static: false }) openPopup: ElementRef;
  @Input() deleteData: deleteInput;
  @Output() deleteOutput = new EventEmitter();
  deleteDescription: string = '';

  deleteSubscribtion$: Subscription;
  modalReference$: any
  spinnerWorking: boolean = false


  constructor(private modalService: NgbModal,
    private commonService: CommonApiServiceService,
    private http:HttpClient
  ) { }


  ngAfterViewInit() {
    this.openpopUp()

  }
  ngOnInit(): void {
  }

  openpopUp() {
    this.modalReference$ = this.modalService.open(this.openPopup, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
      modalDialogClass: 'm-content ',
    });
    this.modalReference$.result.then(
      (result) => { },
      (reason) => {
        this.deleteOutput.emit({ popUp: 'notClose' })
      }
    )

  }
  deleteUrl(data) {
    if (this.deleteDescription && (this.deleteDescription.length < 3 || this.deleteDescription.length > 200)) {
      return
    }
    this.spinnerWorking = true

    this.deleteSubscribtion$ = this.commonService
      .deleteRequest(this.deleteData.url, this.deleteDescription)
      .pipe(debounceTime(500))
      .subscribe({
        next:
          (resp) => {
            this.spinnerWorking = false
            if (resp.rspCode == '1') {
              this.commonService.callAlert('', resp.message, 'success')
              this.deleteOutput.emit({ popUp: 'close' })
              this.modalReference$.close()
            } else {
              this.commonService.callAlert('', resp.message, 'error')
            }

          },
        error: (error) => {
          this.spinnerWorking = false
          this.commonService.callAlert()

        }
      })

  }

  deleteTrim(event) {
    return this.deleteDescription = event.target.value.trim();
  }

  ngOnDestroy() {
    this.deleteSubscribtion$ ? this.deleteSubscribtion$.unsubscribe() : '';
    this.modalReference$ ? this.modalReference$.close() : ''
  }

}
