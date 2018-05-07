import { Component, OnInit } from '@angular/core';
import { CalipsoplusService } from "../calipsoplus.service";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

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
