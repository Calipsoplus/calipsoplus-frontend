import { Component, OnInit } from "@angular/core";
import { CalipsoplusService } from "../calipsoplus.service";
import { CalipsoContainer } from "../calipso-container";
import { CalipsoQuota } from "../calipso-quota";
import { Router } from "@angular/router";

export enum Status {
  idle = 0, // ready
  busy = 1, // waitting
  running = 2, // runing
  full = 3, // forbidden
  error = 4 // error
}

@Component({
  selector: "app-select-calipso-own-resources-form",
  templateUrl: "./select-calipso-own-resources-form.component.html",
  styleUrls: ["./select-calipso-own-resources-form.component.css"]
})
export class SelectCalipsoOwnResourcesFormComponent implements OnInit {
  constructor(
    public calipsoService: CalipsoplusService,
    private router: Router
  ) {}

  safe_locked_button: boolean =  false;

  statusActiveSessions: { [key: string]: Status } = {};
  actualRunningContainer: { [key: string]: string } = {};
  containers: CalipsoContainer[];
  used_quota: CalipsoQuota[];
  user_quota: CalipsoQuota[];

  max_num_machines_exceeded: boolean = false;
  max_num_cpu_exceeded: boolean = false;
  max_memory_exceeded: boolean = false;
  max_hdd_exceeded: boolean = false;

  ngOnInit() {
    this.calipsoService.getCalipsoUserType().subscribe(user_type => {
      this.calipsoService.definedCalipsoUserType = user_type;
      if (user_type && this.calipsoService.isLogged()) {
        let username = this.getUsername();
        this.statusActiveSessions[username] = Status.idle;
        this.load_own_resources();
      } else {
        this.router.navigate(["/"]);
      }
    });
  }

  public getUsername() {
    return this.calipsoService.getLoggedUserName();
  }

  public load_own_resources() {
    if (this.containers) this.containers.splice(0, this.containers.length);

    this.safe_locked_button = true;

    if (this.calipsoService.isLogged()) {
      let username = this.getUsername();

      //get all containers active from user
      this.calipsoService.listContainersActive(username).subscribe(res => {
        this.containers = res;

        // search user in container
        this.containers.forEach(element => {
          var c = this.containers.find(
            x =>
              (x.calipso_experiment == username ||
              x.calipso_experiment == element.calipso_experiment)
          );

          if (c == null) {
            this.statusActiveSessions[username] = Status.idle;
          } else {
            this.check_quota(c.public_name);
          this.actualRunningContainer[username] = "";

            if (c.calipso_experiment == username) {



              switch (c.container_status) {
                case "busy": {
                  this.statusActiveSessions[username] = Status.busy;
                  break;
                }
                case "created": {
                  this.statusActiveSessions[username] = Status.running;
                  this.actualRunningContainer[username] = c.public_name;
                  break;
                }
                case "stopped":
                case "removed": {
                  this.statusActiveSessions[username] = Status.idle;
                  break;
                }
                default: {
                  this.statusActiveSessions[username] = Status.error;
                  break;
                }
              }

            }

          }
        });
        this.safe_locked_button = false;
      });
    } else {
      this.calipsoService.logout();
    }
  }

  public run(base_image: string) {
    let username = this.getUsername();

    this.statusActiveSessions[username] = Status.busy;
    this.actualRunningContainer[username] = base_image;

    this.safe_locked_button = true;


    this.calipsoService.runContainer(username, username, base_image).subscribe(
      data => {
        if (data != null) {
          this.containers.push(data);
          this.check_quota(data.public_name);
          this.statusActiveSessions[username] = Status.running;
        } else {
          this.statusActiveSessions[username] = Status.idle;
        }
        this.safe_locked_button = false;
      },
      error => {
        this.statusActiveSessions[username] = Status.idle;
        this.safe_locked_button = false;
        console.log("Ooops!");
      }
    );
  }

  public stop_and_remove_container() {
    let username = this.getUsername();
    this.safe_locked_button = true;

    this.statusActiveSessions[username] = Status.busy;

    var c = this.containers.find(x => x.calipso_experiment == username);

    this.calipsoService
      .stopContainer(username, c.container_name)
      .subscribe(data => {
        this.containers.find(x => x.id == data.id).container_status =
          data.container_status;

        this.calipsoService
          .removeContainer(username, c.container_name)
          .subscribe(cdata => {
            this.containers.find(x => x.id == cdata.id).container_status =
              cdata.container_status;

            this.containers.forEach((item, index) => {
              if (item.container_name === cdata.container_name) {
                this.containers.splice(index, 1);
                this.calipsoService.removeDateAccess(cdata.container_name);
              }
            });

            this.statusActiveSessions[username] = Status.idle;
            this.actualRunningContainer[username] = "";
            this.safe_locked_button = false;

            this.check_quota(c.public_name);
          });
      });
  }

  public go_in() {
    let session_serial_number = this.getUsername();

    var c = this.containers.find(
      x => x.calipso_experiment == session_serial_number
    );
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

  private check_quota(base_image: string) {
    let username = this.getUsername();

    this.calipsoService
      .getCalipsoAvailableImageQuota(username)
      .subscribe(used => {
        this.used_quota = used;

        this.calipsoService.getCalipsoQuota(username).subscribe(user_quota => {
          this.user_quota = user_quota;

          let max_available =
            this.user_quota[0].max_simultaneous -
            this.used_quota[0].max_simultaneous;

          let cpu_available = this.user_quota[0].cpu - this.used_quota[0].cpu;
          let hdd_available =
            parseInt(this.user_quota[0].hdd.slice(0, -1)) -
            parseInt(this.used_quota[0].hdd.slice(0, -1));
          let memory_available =
            parseInt(this.user_quota[0].memory.slice(0, -1)) -
            parseInt(this.used_quota[0].memory.slice(0, -1));

          this.max_num_machines_exceeded = max_available <= 0;

          this.calipsoService
            .getImageByPublicName(base_image)
            .subscribe(image_quota => {
              this.max_num_cpu_exceeded =
                cpu_available - image_quota[0].cpu < 0;
              this.max_memory_exceeded =
                memory_available -
                  parseInt(image_quota[0].memory.slice(0, -1)) <
                0;
              this.max_hdd_exceeded =
                hdd_available - parseInt(image_quota[0].hdd.slice(0, -1)) < 0;
            });
        });
      });
  }
}
