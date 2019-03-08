import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { MainNavComponent } from '../main-nav/main-nav.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {routes} from '../app-routing.module';
import {PartnersCalipsoPageComponent} from '../partners-calipso-page/partners-calipso-page.component';
import {AdminNavComponent} from '../admin/admin-nav/admin-nav.component';
import {AdminDashboardComponent} from '../admin/admin-dashboard/admin-dashboard.component';
import {AppComponent} from '../app.component';
import {LoginCalipsoUserFormComponent} from '../login-calipso-user-form/login-calipso-user-form.component';
import {SelectCalipsoExperimentFormComponent} from '../select-calipso-experiment-form/select-calipso-experiment-form.component';
import {FacilityNavComponent} from '../facility-nav/facility-nav.component';
import {SelectCalipsoResourceFormComponent} from '../select-calipso-resource-form/select-calipso-resource-form.component';
import {ExperimentNavComponent} from '../experiment-nav/experiment-nav.component';
import {SelectCalipsoQuotaFormComponent} from '../select-calipso-quota-form/select-calipso-quota-form.component';
import {PageNotFoundComponent} from '../page-not-found/page-not-found.component';
import {SelectCalipsoFavoriteFormComponent} from '../select-calipso-favorite-form/select-calipso-favorite-form.component';
import {CalipsoUsersComponent} from '../admin/calipso-users/calipso-users.component';
import {CalipsoContainerImagesComponent} from '../admin/calipso-container-images/calipso-container-images.component';
import {CalipsoVmImagesComponent} from '../admin/calipso-vm-images/calipso-vm-images.component';
import {CalipsoVmComponent} from '../calipso-vm/calipso-vm.component';
import {CalipsoUserProfileComponent} from '../admin/calipso-user-profile/calipso-user-profile.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {by} from 'protractor';
import {By} from '@angular/platform-browser';
import {createComponent} from '@angular/compiler/src/core';

describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,
        LoginCalipsoUserFormComponent,
        SelectCalipsoExperimentFormComponent,
        PartnersCalipsoPageComponent,
        MainNavComponent,
        FacilityNavComponent,
        SelectCalipsoResourceFormComponent,
        ExperimentNavComponent,
        SelectCalipsoQuotaFormComponent,
        PageNotFoundComponent,
        SelectCalipsoFavoriteFormComponent,
        AdminDashboardComponent,
        AdminNavComponent,
        CalipsoUsersComponent,
        CalipsoContainerImagesComponent,
        CalipsoVmImagesComponent,
        CalipsoVmComponent,
        CalipsoUserProfileComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes), FormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate to "" redirects you to 404', fakeAsync(() => {
    router.navigate(['asdfasdf']).then( () => {
      expect(location.path()).toBe('/404');
    });
  }));
});
