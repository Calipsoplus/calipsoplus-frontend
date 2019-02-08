import { Component, Input, OnInit } from "@angular/core";
import { CalipsoplusService } from "../calipsoplus.service";
import { CalipsoExperiment } from "../calipso-experiment";

import { Router } from "@angular/router";
import { CalipsoContainer } from "../calipso-container";

import { CalipsoQuota } from "../calipso-quota";
import { CalipsoPaginationExperiment } from "../calipso-pagination-experiment";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import { CalipsoSession } from "../calipso-sessions";
import { CalipsoImage } from "../calipso-image";
import { CalipsoResource } from "../calipso-resource";

library.add(fas, far);

export enum Status {
  idle = 0, // ready
  busy = 1, // waitting
  running = 2, // runing
  full = 3, // forbidden
  error = 4 // error
}

@Component({
  selector: "app-select-calipso-experiment-form",
  templateUrl: "./select-calipso-experiment-form.component.html",
  styleUrls: ["./select-calipso-experiment-form.component.css"]
})
export class SelectCalipsoExperimentFormComponent implements OnInit {
  @Input()
  only_favorites: boolean = false;
  @Input()
  title: string = "Proposals";

  containers: CalipsoContainer[] = [];
  resources: CalipsoResource[] = [];
  availableImages: CalipsoImage[] = [];

  pagination: CalipsoPaginationExperiment = new CalipsoPaginationExperiment(
    0,
    "",
    "",
    0,
    []
  );
  actual_page: number = 1;
  total_pages: number[] = [];
  sort_field: string = "";
  header_column_sorted: string = "proposal_id";

  experiments: CalipsoExperiment[];
  experiment_selected: CalipsoExperiment;
  session_selected: CalipsoSession;

  sessions: CalipsoSession[];

  used_quota: CalipsoQuota = new CalipsoQuota(0, 0, "0", "0");
  user_quota: CalipsoQuota = new CalipsoQuota(0, 0, "0", "0");

  statusActiveSessions: { [key: string]: Status } = {};

  actualRunningContainer: { [key: string]: string } = {};

  max_num_machines_exceeded: boolean = false;
  max_num_cpu_exceeded: boolean = false;
  max_memory_exceeded: boolean = false;
  max_hdd_exceeded: boolean = false;

  search_key: string = "";

  safe_locked_button: boolean = false;

  message_resources = "";
  message_proposals = "";

  last_sorted = "";

  constructor(
    private calipsoService: CalipsoplusService,
    private router: Router
  ) {}

  public new_resource(
    image: string,
    proposal_id: string,
    session_name: string
  ) {
    this.run(proposal_id, session_name, image);
  }

  public ifDisabled(session: CalipsoSession) {
    if (
      this.statusActiveSessions[session.session_number] == Status.running ||
      this.safe_locked_button ||
      this.max_num_machines_exceeded ||
      this.max_num_cpu_exceeded ||
      this.max_memory_exceeded ||
      this.max_hdd_exceeded
    )
      return "disabled";
    else return "";
  }

  public star_on(serial: string, id: string) {
    this.calipsoService.favorite_experiment(id, 1).subscribe(data => {
      var c = this.experiments.find(x => x.proposal_id == serial);
      if (c != null) {
        c.favorite = true;
      } else this.load_experiments(this.actual_page);
    });
  }

  public star_off(serial: string, id: string) {
    this.calipsoService.favorite_experiment(id, 0).subscribe(data => {
      var c = this.experiments.find(x => x.proposal_id == serial);
      if (c != null) {
        c.favorite = false;
      } else this.load_experiments(this.actual_page);
    });
  }

  public search_action(search_data: string) {
    this.actual_page = 1;
    this.search_key = search_data;
    this.load_experiments(this.actual_page);
  }

  public if_is_sorted(sort_field: string) {
    if (sort_field == this.header_column_sorted) {
      return "column_selected";
    } else return "";
  }

  public sort_by_field(sort_field: string) {
    let sort = "";
    this.actual_page = 1;

    this.header_column_sorted = sort_field;

    if (this.last_sorted != sort_field) {
      this.sort_field = sort_field;
    } else {
      this.sort_field = "-" + sort_field;
    }
    this.last_sorted = this.sort_field;
    this.load_experiments(this.actual_page);
  }

  private check_quota(base_image: string) {
    let username = this.calipsoService.getLoggedUserName();
    this.calipsoService
      .getCalipsoAvailableImageQuota(username)
      .subscribe(used => {
        this.used_quota = used;

        this.calipsoService.getCalipsoQuota(username).subscribe(user_quota => {
          this.user_quota = user_quota;

          let max_available =
            this.user_quota.max_simultaneous - this.used_quota.max_simultaneous;
          let cpu_available = this.user_quota.cpu - this.used_quota.cpu;
          let hdd_available =
            parseInt(this.user_quota.hdd.slice(0, -1)) -
            parseInt(this.used_quota.hdd.slice(0, -1));
          let memory_available =
            parseInt(this.user_quota.memory.slice(0, -1)) -
            parseInt(this.used_quota.memory.slice(0, -1));

          this.max_num_machines_exceeded = max_available <= 0;

          this.calipsoService
            .getImageQuotaByPublicName(base_image)
            .subscribe(image_quota => {
              this.max_num_cpu_exceeded = cpu_available - image_quota.cpu < 0;
              this.max_memory_exceeded =
                memory_available - parseInt(image_quota.memory.slice(0, -1)) <
                0;
              this.max_hdd_exceeded =
                hdd_available - parseInt(image_quota.hdd.slice(0, -1)) < 0;
            });
        });
      });
  }

  public load_all_images() {
    this.calipsoService.getAllAvailableImages().subscribe(images => {
      this.availableImages = images;
    });
  }

  public compare_if_disabled(bol: boolean) {
    if (bol) return "disabled";
    else return "";
  }
  public compare_if_active(bol: boolean) {
    if (bol) return "active";
    else return "";
  }

  public showPage(page: number) {
    let total_pages = this.pagination.count / this.pagination.page_size;
    let medium_pages: boolean = false; //(total_pages/2-1<page)&&(page<total_pages/2+2);
    let actual: boolean = this.actual_page == page;
    let near: boolean =
      this.actual_page - 2 < page && page < this.actual_page + 2;

    return page < 3 || actual || near || medium_pages || page > total_pages - 1;
  }

  public load_experiments(page: number) {
    this.experiment_selected = null;
    let filter = "";
    this.message_proposals = "Loading proposals...";
    if (this.only_favorites) filter = "1";

    if (this.total_pages) {
      this.total_pages.splice(0, this.total_pages.length);
    }
    if (this.experiments) this.experiments.splice(0, this.experiments.length);

    if (this.calipsoService.isLogged()) {
      this.actual_page = page;
      let username = this.calipsoService.getLoggedUserName();
      this.safe_locked_button = false;

      //get all containers active from user
      this.calipsoService.listContainersActive(username).subscribe(res => {
        this.containers = res;

        // get all experiments for a username
        this.calipsoService
          .getCalipsoExperiments(
            username,
            this.actual_page,
            this.sort_field,
            this.search_key,
            filter
          )
          .subscribe(
            experiment => {
              this.pagination = experiment;
              this.experiments = this.pagination.results;

              let points = true;
              for (
                let i: number = 0;
                i < this.pagination.count / this.pagination.page_size;
                i++
              ) {
                if (this.showPage(i + 1)) {
                  this.total_pages.push(i + 1);
                  points = true;
                } else {
                  if (points) {
                    this.total_pages.push(i + 1);
                    points = false;
                  }
                }
              }

              if (this.experiments.length == 0) {
                if (this.only_favorites)
                  this.message_proposals = "No favorite proposals found";
                else this.message_proposals = "No proposals found";
              } else this.message_proposals = "";

              // search experiment in container
              this.experiments.forEach(element => {
                this.sessions = element.sessions;
                this.sessions.forEach(sselement => {
                  var c = this.containers.find(
                    x => x.calipso_experiment == sselement.session_number
                  );

                  if (c == null) {
                    this.statusActiveSessions[sselement.session_number] =
                      Status.idle;
                  } else {
                    this.check_quota(c.public_name);
                    this.actualRunningContainer[sselement.session_number] = "";

                    switch (c.container_status) {
                      case "busy": {
                        this.statusActiveSessions[sselement.session_number] =
                          Status.busy;
                        break;
                      }
                      case "created": {
                        this.statusActiveSessions[sselement.session_number] =
                          Status.running;
                        this.actualRunningContainer[sselement.session_number] =
                          c.public_name;

                        break;
                      }
                      case "stopped":
                      case "removed": {
                        this.statusActiveSessions[sselement.session_number] =
                          Status.idle;
                        break;
                      }
                      default: {
                        this.statusActiveSessions[sselement.session_number] =
                          Status.error;
                        break;
                      }
                    }
                    this.safe_locked_button = false;
                    this.message_resources = "";
                  }
                });
              });
            },
            err => {
              this.calipsoService.logout();

              console.log("Security error");
            }
          );
      });
    } else {
      this.calipsoService.logout();
    }
  }

  public getContainersActive() {
    //get all containers active from user
    let username = this.calipsoService.getLoggedUserName();
    this.message_resources = "Loading resources...";

    if (this.resources) {
      this.resources.splice(0, this.resources.length);
    }

    this.calipsoService.listContainersActive(username).subscribe(
      res => {
        this.containers = res;
        if (this.containers.length == 0) {
          this.message_resources = "No resources found";
        }

        this.containers.forEach(element => {
          var c = this.containers.find(
            x =>
              x.calipso_experiment == element.calipso_experiment &&
              x.calipso_experiment != username
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
                date_access,
                c.container_info,
                c.public_name
              );
              this.message_resources = "";
              this.resources.push(resource);
            }
          }
          if (this.resources.length == 0)
            this.message_resources = "No resources found";
        });
      },
      err => {
        this.router.navigate(["/"]);
      }
    );
  }

  ngOnInit() {
    if (this.calipsoService.isLogged()) {
      this.load_all_images();
      this.load_experiments(this.actual_page);
      this.getContainersActive();
    } else {
      this.router.navigate(["/"]);
    }
  }

  public get_icon(base_image:string){
    return this.calipsoService.get_icon(base_image);
  }

  public run(proposal_id, session_proposal_id, public_name: string) {
    this.statusActiveSessions[session_proposal_id] = Status.busy;
    this.actualRunningContainer[session_proposal_id] = public_name;
    this.message_resources = "Launching...";

    this.safe_locked_button = true;

    //maybe check de base image for its
    this.calipsoService
      .runResource(
        this.calipsoService.getLoggedUserName(),
        proposal_id + "~" + session_proposal_id,
        public_name
      )
      .subscribe(
        data => {
          if (data != null) {
            this.containers.push(data);
            this.check_quota(data.public_name);
            this.statusActiveSessions[session_proposal_id] = Status.running;
            this.getContainersActive();
          } else {
            this.statusActiveSessions[session_proposal_id] = Status.error;
          }
          this.safe_locked_button = false;
          this.message_resources = "";
        },
        error => {
          this.error_on_stop(session_proposal_id);
        }
      );
  }

  private error_on_stop(session_proposal_id: string) {
    this.statusActiveSessions[session_proposal_id] = Status.error;
    this.safe_locked_button = false;
    console.log("error on stop");
  }

  public stop_and_remove_resource(
    session_proposal_id: string,
    public_name: string
  ) {
    let username = this.calipsoService.getLoggedUserName();
    this.safe_locked_button = true;

    this.statusActiveSessions[session_proposal_id] = Status.busy;
    this.message_resources = "Wait...";

    var c = this.containers.find(
      x => x.calipso_experiment == session_proposal_id
    );

    this.calipsoService
      .stopContainer(username, c.container_name, public_name)
      .subscribe(
        data => {
          this.containers.find(x => x.id == data.id).container_status =
            data.container_status;

          this.calipsoService
            .removeContainer(username, c.container_name, public_name)
            .subscribe(
              cdata => {
                this.containers.find(x => x.id == cdata.id).container_status =
                  cdata.container_status;

                this.containers.forEach((item, index) => {
                  if (item.container_name === cdata.container_name) {
                    this.containers.splice(index, 1);
                    this.calipsoService.removeDateAccess(cdata.container_name);
                  }
                });
                if (this.containers.length == 0)
                  this.message_resources = "No resources found.";

                this.getContainersActive();
                this.statusActiveSessions[cdata.calipso_experiment] =
                  Status.idle;
                this.safe_locked_button = false;

                this.check_quota(c.public_name);
              },
              err => {
                this.error_on_stop(session_proposal_id);
              }
            );
        },
        err => {
          this.error_on_stop(session_proposal_id);
        }
      );
  }

  public go_in(session: string) {
    var c = this.containers.find(x => x.calipso_experiment == session);
    if (c == null) console.log("error win up");
    else if (c.host_port == "") {
      this.calipsoService.go_into_resource(
        c.container_name,
        c.guacamole_username,
        c.guacamole_password
      );
    } else {
      this.calipsoService.openURL(c.host_port, c.container_name);
    }
  }

  public selectExperiment(proposal_id: string) {
    this.experiments.forEach(element => {
      if (element.proposal_id == proposal_id) {
        this.experiment_selected = element;

        if (element.sessions.length == 0) {
          this.message_proposals = "This proposal has not sessions.";
        } else this.message_proposals = "";
      }
    });
  }

  public backtoExperiment() {
    this.experiment_selected = null;
    this.load_experiments(this.actual_page);
  }

  public gotoExperiment(proposal_id: string) {
    this.search_key = proposal_id;
    let username = this.calipsoService.getLoggedUserName();

    if (proposal_id == username) {
      this.router.navigate(["/ownresources"]);
      return;
    }

    this.experiment_selected = null;
    if (this.experiments) this.experiments.splice(0, this.experiments.length);

    // get all experiments for a username
    this.calipsoService
      .getCalipsoExperiments(username, 1, this.sort_field, this.search_key, "")
      .subscribe(
        experiment => {
          this.experiments = experiment.results;
          // search experiment in container
          this.experiments.forEach(element => {
            if (element.proposal_id == proposal_id) {
              this.experiment_selected = element;
              this.sessions = element.sessions;
              this.sessions.forEach(sselement => {
                var c = this.containers.find(
                  x => x.calipso_experiment == sselement.session_number
                );

                if (c == null) {
                  this.statusActiveSessions[sselement.session_number] =
                    Status.idle;
                } else {
                  this.check_quota(c.public_name);
                  this.actualRunningContainer[sselement.session_number] = "";

                  switch (c.container_status) {
                    case "busy": {
                      this.statusActiveSessions[sselement.session_number] =
                        Status.busy;
                      break;
                    }
                    case "created": {
                      this.statusActiveSessions[sselement.session_number] =
                        Status.running;
                      this.actualRunningContainer[sselement.session_number] =
                        c.public_name;

                      break;
                    }
                    case "stopped":
                    case "removed": {
                      this.statusActiveSessions[sselement.session_number] =
                        Status.idle;
                      break;
                    }
                    default: {
                      this.statusActiveSessions[sselement.session_number] =
                        Status.error;
                      break;
                    }
                  }
                  this.safe_locked_button = false;
                }
              });
            }
          });
          this.search_key = "";
        },
        err => {
          this.search_key = "";
          console.log("experiment not found");
        }
      );
  }
}
