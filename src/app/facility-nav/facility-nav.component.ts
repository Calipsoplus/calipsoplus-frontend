import { Component, OnInit } from '@angular/core';
import { CalipsoplusService } from '../calipsoplus.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-facility-nav',
  templateUrl: './facility-nav.component.html',
  styleUrls: ['./facility-nav.component.css']
})
export class FacilityNavComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private calipsoService: CalipsoplusService,
    private router: Router
  ) {}

  ngOnInit() {}

  public getUserName(): string {
    return this.authService.getLoggedUserName();
  }

  public isLogged(): boolean {
    return this.authService.isLogged();
  }

  public logout() {
    this.authService.logout();
  }

  public getMyLogo(){
    return this.calipsoService.getMyLogo();
  }
}
