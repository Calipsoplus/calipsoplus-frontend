import { Component, OnInit } from "@angular/core";

import { CalipsoQuota } from "../calipso-quota";
import { CalipsoImage } from "../calipso-image";

import { CalipsoplusService } from "../calipsoplus.service";

import { Router } from "@angular/router";

@Component({
  selector: "app-select-calipso-quota-form",
  templateUrl: "./select-calipso-quota-form.component.html",
  styleUrls: ["./select-calipso-quota-form.component.css"]
})
export class SelectCalipsoQuotaFormComponent implements OnInit {
  constructor(
    private calipsoService: CalipsoplusService,
    private router: Router
  ) {}

  quotas: CalipsoQuota[];
  used_quota: CalipsoQuota[];
  image_selected: CalipsoImage[];
  available_quota: CalipsoQuota[] = [];

  ngOnInit() {
    if (this.calipsoService.isLogged()) {
      let username = this.calipsoService.getLoggedUserName();
      this.calipsoService.getCalipsoQuota(username).subscribe(quotas => {
        this.quotas = quotas;

        this.calipsoService
          .getCalipsoAvailableImageQuota(username)
          .subscribe(used => {
            this.used_quota = used;
            this.available_quota.push(new CalipsoQuota(0, 0, "0", "0"));

            for (let index = 0; index < this.quotas.length; index++) {
              this.available_quota[index].cpu =
                this.quotas[index].cpu - this.used_quota[index].cpu;
              this.available_quota[index].memory =
                parseInt(this.quotas[index].memory.slice(0, -1)) -
                parseInt(this.used_quota[index].memory.slice(0, -1)) +
                "g";
              this.available_quota[index].max_simultaneous =
                this.quotas[index].max_simultaneous -
                this.used_quota[index].max_simultaneous;
              this.available_quota[index].hdd =
                parseInt(this.quotas[index].hdd.slice(0, -1)) -
                parseInt(this.used_quota[index].hdd.slice(0, -1)) +
                "g";
            }
          });
      });

      // get default image user for all containers
      this.calipsoService
        .getImageByPublicName("base_image")
        .subscribe(image_quota => {
          this.image_selected = image_quota;
        });
    }
  }
}
