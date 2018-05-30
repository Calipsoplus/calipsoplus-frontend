import { Component, OnInit } from "@angular/core";
import { CalipsoplusService } from "../calipsoplus.service";

import { CalipsoResource } from "../calipso-resource";
import { CalipsoContainer } from "../calipso-container";

import { Router } from "@angular/router";

@Component({
  selector: "app-select-calipso-resource-form",
  templateUrl: "./select-calipso-resource-form.component.html",
  styleUrls: ["./select-calipso-resource-form.component.css"]
})
export class SelectCalipsoResourceFormComponent implements OnInit {
  containers: CalipsoContainer[] = [];
  resources: CalipsoResource[] = [];

  constructor(
    private calipsoService: CalipsoplusService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.calipsoService.isLogged()) {
      let username = this.calipsoService.getLoggedUserName();

      //get all containers active from user
      this.calipsoService.listContainersActive(username).subscribe(res => {
        this.containers = res;

        this.containers.forEach(element => {
          var c = this.containers.find(
            x => x.calipso_experiment == element.calipso_experiment
          );
          if (c != null) {
            if ((c.container_status == "created")) {
              var resource: CalipsoResource = new CalipsoResource(
                c.calipso_experiment,
                c.container_name,
                "192.168.11.12/8080",
                "01/02/2018",
                "24/10/2018",
                "12/05/2018",
                c.container_info
              );
              this.resources.push(resource);
            }
          }
        });
      });
    } else {
      this.router.navigate(["login"]);
    }
  }

  public go_in(container_name: string) {
    var c = this.containers.find(x => x.container_name == container_name);
    if (c == null) alert("error win up");
    else {
      var paramenters = btoa(
        "un=" + c.guacamole_username + "&up=" + c.guacamole_password
      );
      window.open(
        this.calipsoService.guacamoleUrl + "guac_access.html?t=" + paramenters,
        c.container_name,
        "menubar=no, location=no, toolbar=no, scrollbars=yes, height=500"
      );
    }
  }
}
