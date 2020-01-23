import { Component, OnInit } from '@angular/core';
import { CalipsoFacility } from '../calipso-facility';
import { CalipsoplusService } from '../calipsoplus.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-partners-calipso-page',
  templateUrl: './partners-calipso-page.component.html',
  styleUrls: ['./partners-calipso-page.component.css']
})
export class PartnersCalipsoPageComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private calipsoService: CalipsoplusService,
    private router: Router
  ) { }

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
    // TODO: overwrite url for dependency with the environment.
    url = environment.frontend.url;
    window.location.href = url + 'login';
  }
  public isLogged() {
    return this.authService.isLogged();
  }
}
