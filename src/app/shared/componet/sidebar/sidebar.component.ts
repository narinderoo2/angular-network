import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  changeflag1:boolean=true
  changeflag2:boolean=false
  constructor(public router: Router) { }

  ngOnInit(): void {
    console.log(this.router.url);
    
  }
  

  redirectPage(routing:string){
this.router.navigate([routing])
  }

}
