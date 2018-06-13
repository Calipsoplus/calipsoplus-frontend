import { Component, OnInit } from "@angular/core";
import { CalipsoplusService } from "../calipsoplus.service";
import { Router } from "@angular/router";

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
    this.calipsoService.unauth().subscribe(
      resp => {
        this.router.navigate(["/"]);
      },
      error => {
        alert("Error in logout");
      }
    );
  }
}
