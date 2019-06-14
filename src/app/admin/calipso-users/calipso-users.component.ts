import {Component, Input, OnInit} from '@angular/core';
import {CalipsoQuota} from '../../calipso-quota';
import {CalipsoplusService} from '../../calipsoplus.service';
import {Router} from '@angular/router';
import {CalipsoImage} from '../../calipso-image';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {CalipsoExperiment} from '../../calipso-experiment';
import {CalipsoSession} from '../../calipso-sessions';
import {CalipsoContainer} from '../../calipso-container';
import {CalipsoPaginationExperiment} from '../../calipso-pagination-experiment';
import {CalipsoPaginationUser} from '../../CalipsoPaginationUser';
import {CalipsoUser} from '../../calipso-user';
import {AuthenticationService} from '../../authentication.service';

library.add(fas, far);

export enum Status {
  idle = 0, // ready
  busy = 1, // waitting
  running = 2, // runing
  full = 3, // forbidden
  error = 4 // error
}

@Component({
  selector: 'app-calipso-users',
  templateUrl: './calipso-users.component.html',
  styleUrls: ['./calipso-users.component.css']
})
export class CalipsoUsersComponent implements OnInit {

  quotas: CalipsoQuota;
  used_quota: CalipsoQuota;
  image_selected: CalipsoImage;
  available_quota: CalipsoQuota;

@Input()
only_favorites = false;
@Input()
title = 'Users';

pagination: CalipsoPaginationUser = new CalipsoPaginationUser(
  0,
  '',
  '',
  0,
  []
);
actual_page = 1;
total_pages: number[] = [];
sort_field = '';
header_column_sorted = 'serial_number';

users: CalipsoUser[];

sessions: CalipsoSession[];
containers: CalipsoContainer[];

user_quota: CalipsoQuota;

statusActiveSessions: { [key: string]: Status } = {};

actualRunningContainer: { [key: string]: string } = {};

max_num_machines_exceeded = false;
max_num_cpu_exceeded = false;
max_memory_exceeded = false;
max_hdd_exceeded = false;

search_key = '';

safe_locked_button = false;
last_sorted = '';

constructor(
  private authService: AuthenticationService,
  private calipsoService: CalipsoplusService,
  private router: Router
) {}


public search_action(search_data: string) {
  this.actual_page = 1;
  this.search_key = search_data;
  this.load_experiments(this.actual_page);
}

public if_is_sorted(sort_field: string) {
  if (sort_field === this.header_column_sorted) {
    return 'column_selected';
  } else { return ''; }
}

public sort_by_field(sort_field: string) {
  const sort = '';
  this.actual_page = 1;

  this.header_column_sorted = sort_field;

  if (this.last_sorted !== sort_field) {
    this.sort_field = sort_field;
  } else {
    this.sort_field = '-' + sort_field;
  }
  this.last_sorted = this.sort_field;
  this.load_experiments(this.actual_page);
}

public compare_if_disabled(bol: boolean) {
  if (bol) {
    return 'disabled';
  } else { return ''; }
}
public compare_if_active(bol: boolean) {
  if (bol) { return 'active'; } else { return ''; }
}

public showPage(page: number) {
  const total_pages = this.pagination.count / this.pagination.page_size;
  const medium_pages = false; // (total_pages/2-1<page)&&(page<total_pages/2+2);
  const actual: boolean = this.actual_page === page;
  const near: boolean =
    this.actual_page - 2 < page && page < this.actual_page + 2;

  return page < 3 || actual || near || medium_pages || page > total_pages - 1;
}

public load_experiments(page: number) {
  if (this.total_pages) {
    this.total_pages.splice(0, this.total_pages.length);
  }
  if (this.users) { this.users.splice(0, this.users.length); }
    this.actual_page = page;
    this.safe_locked_button = false;

      // get all users
      this.calipsoService
        .getUsers(
          this.actual_page,
          this.sort_field,
          this.search_key
        )
        .subscribe(
          users => {
            this.pagination = users;
            this.users = this.pagination.results;

            let points = true;
            for (
              let i = 0;
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
          },
          err => {
            this.authService.logout();

            console.log('Security error');
          }
        );
}

ngOnInit() {
  if (this.authService.isLogged()) {
    this.load_experiments(this.actual_page);
  } else {
    this.router.navigate(['/']);
  }
}

}
