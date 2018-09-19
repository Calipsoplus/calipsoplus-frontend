import { Component } from "@angular/core";
import { CalipsoplusService } from "./calipsoplus.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CALIPSOplus";

  constructor(private calipsoService: CalipsoplusService) {}

  ngOnInit() {
    //console.log("getCalipsoSettings");
    this.calipsoService.getCalipsoSettings().subscribe(settings => {
      this.calipsoService.calipsoSettings = settings;
      //console.log("settings:" + this.calipsoService.calipsoSettings.local_auth);
    });
  }
}
