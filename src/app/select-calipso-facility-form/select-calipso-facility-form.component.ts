import { Component, OnInit } from '@angular/core';

import { CalipsoplusService } from "../calipsoplus.service";
import { CalipsoFacility } from "../calipso-facility";

import { Router } from "@angular/router";

@Component({
  selector: 'app-select-calipso-facility-form',
  templateUrl: './select-calipso-facility-form.component.html',
  styleUrls: ['./select-calipso-facility-form.component.css']
})

export class SelectCalipsoFacilityFormComponent implements OnInit {


  facilities: CalipsoFacility[];
  selectedVal: Number;

  constructor(private calipsoService: CalipsoplusService, private router: Router) { }

  ngOnInit() {
    if (this.calipsoService.isLogged()) {
         this.calipsoService.getCalipsoFacilities().subscribe(facilities=>this.facilities=facilities)
    }else {
      this.router.navigate(['login']);
    }
  }


  next() {
    this.router.navigate(['experiment']);
  }

}
