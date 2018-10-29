import { Component, OnInit } from "@angular/core";
import { CalipsoplusService } from "../calipsoplus.service";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { LOGO_FACILITY } from "../calipso-constants";

@Component({
  selector: "app-facility-nav",
  templateUrl: "./facility-nav.component.html",
  styleUrls: ["./facility-nav.component.css"]
})
export class FacilityNavComponent implements OnInit {
  constructor(
    public calipsoService: CalipsoplusService,
    private router: Router
  ) {}

  ngOnInit() {}

  public getUserName(): string {
    return this.calipsoService.getLoggedUserName();
  }

  public isLogged(): boolean {
    return this.calipsoService.isLogged();
  }

  public logout() {
    //console.log("login_local:"+this.calipsoService.calipsoSettings.local_auth);
    if (this.calipsoService.getLoginType() == "local") {
      this.calipsoService.unauth().subscribe(
        resp => {
          //console.log("logout done from UO");
          this.router.navigate(["/"]);
        },
        error => {
          //console.log("Error in UO logout");
        }
      );
    } else {
      this.calipsoService.unauthUmbrella().subscribe(
        resp => {
          //console.log("logout done from umbrella");
          window.location.href =
            environment.backendUrl_calipso +
            "Shibboleth.sso/Logout?return=" +
            environment.frontend_calipso;
        },
        error => {
          //console.log("Error in umbrella logout");
        }
      );
    }
  }
}
