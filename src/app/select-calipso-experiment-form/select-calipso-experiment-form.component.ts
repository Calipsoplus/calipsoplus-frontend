import { Component, OnInit } from "@angular/core";
import { CalipsoplusService } from "../calipsoplus.service";
import { CalipsoExperiment } from "../calipso-experiment";

import { Router } from "@angular/router";
import { CalipsoContainer } from "../calipso-container";

import { Observable } from "rxjs/Observable";

let Status_idle = 0;
let Status_busy = 1;
let Status_running = 2;
let Status_full = 3;
let Status_error = 4;

export enum Status {
  idle = Status_idle,
  busy = Status_busy,
  running = Status_running,
  full = Status.full,
  error = Status.error
}

@Component({
  selector: "app-select-calipso-experiment-form",
  templateUrl: "./select-calipso-experiment-form.component.html",
  styleUrls: ["./select-calipso-experiment-form.component.css"]
})
export class SelectCalipsoExperimentFormComponent implements OnInit {
  experiments: CalipsoExperiment[];
  containers: CalipsoContainer[];

  statusActiveExperiments: { [key: string]: Status } = {};

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

        // get all experiments for a username
        this.calipsoService.getCalipsoExperiments(username).subscribe(data => {
          this.experiments = data;

          this.experiments.forEach(element => {
            var c = this.containers.find(
              x => x.calipso_experiment == element.serial_number
            );

            if (c == null) {
              this.statusActiveExperiments[element.serial_number] = Status.idle;
            } else {
              switch (c.container_status) {
                case "created": {
                  this.statusActiveExperiments[element.serial_number] =
                    Status.running;
                  break;
                }
                case "stopped":
                case "removed": {
                  this.statusActiveExperiments[element.serial_number] =
                    Status.idle;
                  break;
                }
                default: {
                  this.statusActiveExperiments[element.serial_number] =
                    Status.error;
                  break;
                }
              }
            }
          });
        });
      });
    } else {
      this.router.navigate(["login"]);
    }
  }

  public run(experiment_serial_number: string) {
    this.statusActiveExperiments[experiment_serial_number] = Status.busy;
    this.calipsoService
      .runContainer(
        this.calipsoService.getLoggedUserName(),
        experiment_serial_number
      )
      .subscribe(data => {
        this.containers.push(data);
        this.statusActiveExperiments[experiment_serial_number] = Status.running;
      });
  }

  public stop_and_remove_container(experiment_serial_number: string) {
    this.statusActiveExperiments[experiment_serial_number] = Status.busy;

    var c = this.containers.find(
      x => x.calipso_experiment == experiment_serial_number
    );

    this.calipsoService.stopContainer(c.container_name).subscribe(data => {
      this.containers.find(x => x.id == data.id).container_status =
        data.container_status;

      this.calipsoService.removeContainer(c.container_name).subscribe(cdata => {
        this.containers.find(x => x.id == cdata.id).container_status =
          cdata.container_status;

        this.containers.forEach((item, index) => {
          if (item.container_name === cdata.container_name)
            this.containers.splice(index, 1);
        });

        this.statusActiveExperiments[cdata.calipso_experiment] = Status.idle;
      });
    });
  }
}
