import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
    SelectCalipsoFavoriteFormComponent
  ],
  providers: [CalipsoplusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
