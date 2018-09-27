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
      this.calipsoService.listContainersActive(username).subscribe(
        res => {
          this.containers = res;

          this.containers.forEach(element => {
            var c = this.containers.find(
              x => x.calipso_experiment == element.calipso_experiment
            );
            if (c != null) {
              let date = new Date(c.creation_date);
              let str_creation_date = this.calipsoService.formatDate(date);
              let date_access = this.calipsoService.getDateAccess(
                c.container_name
              );
              if (c.container_status == "created") {
                var resource: CalipsoResource = new CalipsoResource(
                  c.calipso_experiment,
                  c.container_name,
                  c.public_name,
                  str_creation_date,
                  "-",
                  date_access
                );
                this.resources.push(resource);
              }
            }
          });
        },
        err => {
          this.router.navigate(["/"]);
          //console.log("Secutiry error");
        }
      );
    } else {
      this.router.navigate(["/"]);
    }
  }

  public go_in(container_name: string) {
    var c = this.containers.find(x => x.container_name == container_name);
    if (c == null) console.log("error win up");
    else if (c.host_port == "") {
      this.calipsoService.go_into_container(
        c.container_name,
        c.guacamole_username,
        c.guacamole_password
      );
    } else {
      this.calipsoService.openURL(c.host_port, c.container_name);
    }
  }
}
