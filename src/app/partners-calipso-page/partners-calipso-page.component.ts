import { Component, OnInit } from '@angular/core';
import { CalipsoFacility } from '../calipso-facility';
import { CalipsoplusService } from '../calipsoplus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partners-calipso-page',
  templateUrl: './partners-calipso-page.component.html',
  styleUrls: ['./partners-calipso-page.component.css']
})
export class PartnersCalipsoPageComponent implements OnInit {
  constructor(
    private calipsoService: CalipsoplusService,
    private router: Router
  ) {}

  facilities: CalipsoFacility[];

  ngOnInit() {
    this.getFacilities();
  }

  public getFacilities() {
    try {
      this.calipsoService
        .getCalipsoFacilities()
        .subscribe(facilities => (this.facilities = facilities));
    } catch (e) {
      console.log(e);
    }
  }

  public enterFacility(url: string) {
      window.location.href = url + 'login';
   }
  public isLogged() {
    return this.calipsoService.isLogged();
  }
}
