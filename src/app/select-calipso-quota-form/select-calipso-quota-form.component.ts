import { Component, OnInit } from '@angular/core';

import { CalipsoQuota } from '../calipso-quota';
import { CalipsoImage } from '../calipso-image';

import { CalipsoplusService } from '../calipsoplus.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-select-calipso-quota-form',
  templateUrl: './select-calipso-quota-form.component.html',
  styleUrls: ['./select-calipso-quota-form.component.css']
})
export class SelectCalipsoQuotaFormComponent implements OnInit {
  constructor(
    private calipsoService: CalipsoplusService,
    private router: Router
  ) {}

  quotas: CalipsoQuota = new CalipsoQuota(0, 0, '0', '0');
  used_quota: CalipsoQuota = new CalipsoQuota(0, 0, '0', '0');
  image_selected: CalipsoImage = new CalipsoImage('name', 'image', '', 0, '0', '0', '1');

  available_quota: CalipsoQuota = new CalipsoQuota(0, 0, '0', '0');

  ngOnInit() {
    if (this.calipsoService.isLogged()) {
      const username = this.calipsoService.getLoggedUserName();
      this.calipsoService.getCalipsoQuota(username).subscribe(
        quotas => {
          this.quotas = quotas;
          this.calipsoService
            .getCalipsoAvailableImageQuota(username)
            .subscribe(used => {
              this.used_quota = used;

                this.available_quota.cpu =
                  this.quotas.cpu - this.used_quota.cpu;
                this.available_quota.memory =
                  parseInt(this.quotas.memory.slice(0, -1), 10) -
                  parseInt(this.used_quota.memory.slice(0, -1), 10) +
                  'G';
                this.available_quota.max_simultaneous =
                  this.quotas.max_simultaneous -
                  this.used_quota.max_simultaneous;
                this.available_quota.hdd =
                  parseInt(this.quotas.hdd.slice(0, -1), 10) -
                  parseInt(this.used_quota.hdd.slice(0, -1), 10) +
                  'G';
            });
        },
        error => {
          this.router.navigate(['/']);
          // console.log('Security error');
        }
      );

      // get default image, may be incorrect!
      // must be refactorized
      this.calipsoService
        .getImageQuotaByPublicName('base_image')
        .subscribe(image_quota => {
          this.image_selected = image_quota;
        },
        error => {
          this.router.navigate(['/']);
          console.log('base_image not found!');
        });
    } else {
      this.router.navigate(['/']);
    }
  }
}
