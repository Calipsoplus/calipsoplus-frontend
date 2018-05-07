import { Component, OnInit } from '@angular/core';
import { CalipsoplusService } from "../calipsoplus.service";

@Component({
  selector: 'app-facility-nav',
  templateUrl: './facility-nav.component.html',
  styleUrls: ['./facility-nav.component.css']
})
export class FacilityNavComponent implements OnInit {

  constructor(private calipsoService: CalipsoplusService) { }

  ngOnInit() {
  }
  public getUserName():string{
    return this.calipsoService.getLoggedUserName();
  }

  public isLogged():boolean{
    return this.calipsoService.isLogged();
  }

  public logout(){
    this.calipsoService.logout();
  }

}
