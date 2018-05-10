import { Component, OnInit } from '@angular/core';

import { CalipsoplusService } from "../calipsoplus.service";

@Component({
  selector: 'app-facility-nav',
  templateUrl: './facility-nav.component.html',
  styleUrls: ['./facility-nav.component.css']
})
export class FacilityNavComponent implements OnInit {

  constructor(public calipsoService: CalipsoplusService) { }

  ngOnInit() {
  }
}
