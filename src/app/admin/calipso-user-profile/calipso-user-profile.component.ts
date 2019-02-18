import { Component, OnInit, Input } from '@angular/core';
import {CalipsoplusService} from '../../calipsoplus.service';
import {CalipsoUser} from '../../calipso-user';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {CalipsoContainer} from '../../calipso-container';
import {CalipsoResource} from '../../calipso-resource';
import {CalipsoQuota} from '../../calipso-quota';
import {CalipsoImage} from '../../calipso-image';

@Component({
  selector: 'app-calipso-user-profile',
  templateUrl: './calipso-user-profile.component.html',
  styleUrls: ['./calipso-user-profile.component.css']
})
export class CalipsoUserProfileComponent implements OnInit {

  calipsoUser: CalipsoUser;
  username: string;
  containers: CalipsoContainer[];
  resources: CalipsoResource[] = [];
  virtualMachines: CalipsoResource[] = [];

  quotas: CalipsoQuota;
  used_quota: CalipsoQuota;
  available_quota: CalipsoQuota;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private calipsoService: CalipsoplusService
  ) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.getUser();
    this.getContainers();
    this.getQuota();
  }
  getUser(): void {
    this.calipsoService.getCalipsoUser(this.username).subscribe(
      res => {
        this.calipsoUser = res;
      },
      error => {
        console.log(error);
      }
    );
  }
  getContainers(): void {

    // get all containers active from user
    this.calipsoService.listContainersActive(this.username).subscribe(
      res => {
        this.containers = res;
        console.log(this.containers);

        this.containers.forEach(element => {
          const c = this.containers.find(
            x => x.calipso_experiment ===  element.calipso_experiment
          );
          if (c != null) {
            const date = new Date(c.creation_date);
            const str_creation_date = this.calipsoService.formatDate(date);
            const date_access = this.calipsoService.getDateAccess(
              c.container_name
            );
            if (c.container_status === 'created') {
              const resource: CalipsoResource = new CalipsoResource(
                c.calipso_experiment,
                c.container_name,
                c.public_name,
                str_creation_date,
                '-',
                date_access,
                c.container_info,
                c.public_name
              );
              this.resources.push(resource);
              console.log(this.resources);
            }
          }
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  getQuota(): void {
    this.calipsoService.getCalipsoQuota(this.username).subscribe(
      quotas => {
        this.quotas = quotas;
        this.calipsoService
          .getCalipsoAvailableImageQuota(this.username)
          .subscribe(used => {
            this.used_quota = used;
            this.available_quota = new CalipsoQuota(0, 0, '0', '0');

            this.available_quota.cpu = this.quotas.cpu - this.used_quota.cpu;
            this.available_quota.memory = parseInt(this.quotas.memory.slice(0, -1), 10) -
              parseInt(this.used_quota.memory.slice(0, -1), 10) + 'G';
            this.available_quota.max_simultaneous = this.quotas.max_simultaneous -
              this.used_quota.max_simultaneous;
            this.available_quota.hdd = parseInt(this.quotas.hdd.slice(0, -1), 10) -
              parseInt(this.used_quota.hdd.slice(0, -1), 10) + 'G';
          });
      },
      error => {
       console.log(error);
      });
  }

  public go_in(session_proposal_id: string) {
    const c = this.containers.find(
      x => x.calipso_experiment === session_proposal_id
    );
    if (c == null) { console.log('error win up'); } else if (c.host_port === '') {
      this.calipsoService.go_into_resource(
        c.container_name,
        c.guacamole_username,
        c.guacamole_password
      );
    } else {
      this.calipsoService.openURL(c.host_port, c.container_name);
    }
  }

  public get_icon(base_image: string) {
    return this.calipsoService.get_icon(base_image);
  }

}
