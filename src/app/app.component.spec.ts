import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PartnersCalipsoPageComponent} from './partners-calipso-page/partners-calipso-page.component';
import {LoginCalipsoUserFormComponent} from './login-calipso-user-form/login-calipso-user-form.component';
import {SelectCalipsoExperimentFormComponent} from './select-calipso-experiment-form/select-calipso-experiment-form.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MainNavComponent} from './main-nav/main-nav.component';
import {SelectCalipsoResourceFormComponent} from './select-calipso-resource-form/select-calipso-resource-form.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {SelectCalipsoFavoriteFormComponent} from './select-calipso-favorite-form/select-calipso-favorite-form.component';
import {FacilityNavComponent} from './facility-nav/facility-nav.component';
import {ExperimentNavComponent} from './experiment-nav/experiment-nav.component';
import {SelectCalipsoQuotaFormComponent} from './select-calipso-quota-form/select-calipso-quota-form.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {AdminNavComponent} from './admin/admin-nav/admin-nav.component';
import {CalipsoUsersComponent} from './admin/calipso-users/calipso-users.component';
import {CalipsoContainerImagesComponent} from './admin/calipso-container-images/calipso-container-images.component';
import {CalipsoVmImagesComponent} from './admin/calipso-vm-images/calipso-vm-images.component';
import {CalipsoVmComponent} from './calipso-vm/calipso-vm.component';
import {CalipsoUserProfileComponent} from './admin/calipso-user-profile/calipso-user-profile.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, FormsModule, HttpClientTestingModule],
      declarations: [
        AppComponent,
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
        CalipsoUserProfileComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('CALIPSOplus');
  }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
