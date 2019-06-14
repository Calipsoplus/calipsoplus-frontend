import { Component, OnInit } from '@angular/core';

import { CalipsoQuota } from '../calipso-quota';
import { CalipsoImage } from '../calipso-image';

import { CalipsoplusService } from '../calipsoplus.service';

import { Router } from '@angular/router';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-select-calipso-quota-form',
  templateUrl: './select-calipso-quota-form.component.html',
  styleUrls: ['./select-calipso-quota-form.component.css']
})
export class SelectCalipsoQuotaFormComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private calipsoService: CalipsoplusService,
    private router: Router
  ) { }

  quotas: CalipsoQuota = new CalipsoQuota(0, 0, '0', '0');
  used_quota: CalipsoQuota = new CalipsoQuota(0, 0, '0', '0');

  available_quota: CalipsoQuota = new CalipsoQuota(0, 0, '0', '0');

  ngOnInit() {
      const username = this.authService.getLoggedUserName();
      this.calipsoService.getCalipsoQuota(username).subscribe(
        quotas => {
          console.log('quotas:' + quotas.cpu, quotas.hdd, quotas.max_simultaneous, quotas.memory);
          this.setQuota(quotas);
          this.calipsoService
            .getCalipsoAvailableImageQuota(username)
            .subscribe(used => {
              this.setUsedQuota(used);

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
        }
      );
<<<<<<< HEAD
    } else {
      this.router.navigate(['/']);
    }

  }
=======
    }
>>>>>>> 1cead0441c88aa65d6218da905719d10b187d179

  setUsedQuota(quota: CalipsoQuota) {
    this.used_quota = quota;
  }

  setQuota(quota: CalipsoQuota) {
    this.quotas = quota;
  }
}
