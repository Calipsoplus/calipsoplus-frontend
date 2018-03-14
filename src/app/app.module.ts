import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'; 


import { AppComponent } from './app.component';
import { LoginCalipsoUserFormComponent } from './login-calipso-user-form/login-calipso-user-form.component';
import { AppRoutingModule } from './app-routing.module';
import { SelectCalipsoFacilityFormComponent } from './select-calipso-facility-form/select-calipso-facility-form.component';
import { CalipsoplusService} from './calipsoplus.service';
import { SelectCalipsoExperimentFormComponent } from './select-calipso-experiment-form/select-calipso-experiment-form.component';
import { HomeCalipsoPageComponent } from './home-calipso-page/home-calipso-page.component';
import { AboutCalipsoPageComponent } from './about-calipso-page/about-calipso-page.component';
import { PartnersCalipsoPageComponent } from './partners-calipso-page/partners-calipso-page.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule  
  ],
  declarations: [
    AppComponent,
    LoginCalipsoUserFormComponent,
    SelectCalipsoFacilityFormComponent,
    SelectCalipsoExperimentFormComponent,
    HomeCalipsoPageComponent,
    AboutCalipsoPageComponent,
    PartnersCalipsoPageComponent
  ],
  providers: [CalipsoplusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
