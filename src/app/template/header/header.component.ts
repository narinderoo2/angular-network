import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemService } from 'src/app/shared/services/them.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private themeService: ThemService,
    ) {

  }

  istoggle: boolean = false


  ngOnInit(): void {
    this.themeService.toggleLight();

  }




  istoggleButton(){
    this.istoggle = !this.istoggle
  }
}
