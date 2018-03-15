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
  }

  public getUserName():string{
    return this.calipsoService.getUserLogged();
  }

  public isLogged():boolean{
    return this.calipsoService.isLogged();
  }

  public logout(){
    this.calipsoService.logout();
  }
}
