import { Component, OnInit } from '@angular/core';
import { CalipsoFacility } from '../calipso-facility';
import { CalipsoplusService } from '../calipsoplus.service';

@Component({
  selector: 'app-partners-calipso-page',
  templateUrl: './partners-calipso-page.component.html',
  styleUrls: ['./partners-calipso-page.component.css']
})
export class PartnersCalipsoPageComponent implements OnInit {

  constructor(private calipsoService: CalipsoplusService) { }


  facilities: CalipsoFacility[];

  ngOnInit() {
    this.calipsoService.getCalipsoFacilities().subscribe(facilities=>this.facilities=facilities)
  }

}

