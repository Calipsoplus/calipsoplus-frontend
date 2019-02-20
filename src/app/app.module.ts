import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginCalipsoUserFormComponent } from './login-calipso-user-form/login-calipso-user-form.component';
import { AppRoutingModule } from './app-routing.module';
import { CalipsoplusService} from './calipsoplus.service';
import { SelectCalipsoExperimentFormComponent } from './select-calipso-experiment-form/select-calipso-experiment-form.component';
import { PartnersCalipsoPageComponent } from './partners-calipso-page/partners-calipso-page.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MainNavComponent } from './main-nav/main-nav.component';
import { FacilityNavComponent } from './facility-nav/facility-nav.component';
import { SelectCalipsoResourceFormComponent } from './select-calipso-resource-form/select-calipso-resource-form.component';
import { ExperimentNavComponent } from './experiment-nav/experiment-nav.component';
import { SelectCalipsoQuotaFormComponent } from './select-calipso-quota-form/select-calipso-quota-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectCalipsoFavoriteFormComponent } from './select-calipso-favorite-form/select-calipso-favorite-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {AdminNavComponent} from './admin/admin-nav/admin-nav.component';
import {CalipsoUsersComponent} from './admin/calipso-users/calipso-users.component';
import {CalipsoContainerImagesComponent} from './admin/calipso-container-images/calipso-container-images.component';
import {CalipsoVmImagesComponent} from './admin/calipso-vm-images/calipso-vm-images.component';
import { CalipsoVmComponent } from './calipso-vm/calipso-vm.component';
import {CalipsoUserProfileComponent} from './admin/calipso-user-profile/calipso-user-profile.component';
import {AuthGuard} from './auth-guard.service';
import { NewContainerImageFormComponent } from './admin/new-container-image-form/new-container-image-form.component';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule.forRoot()
  ],
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
    CalipsoUserProfileComponent,
    NewContainerImageFormComponent
  ],
  providers: [CalipsoplusService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
