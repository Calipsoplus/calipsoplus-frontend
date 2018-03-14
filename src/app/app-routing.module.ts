import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCalipsoUserFormComponent } from './login-calipso-user-form/login-calipso-user-form.component';
import { SelectCalipsoFacilityFormComponent } from './select-calipso-facility-form/select-calipso-facility-form.component';
import { SelectCalipsoExperimentFormComponent } from './select-calipso-experiment-form/select-calipso-experiment-form.component';
import { HomeCalipsoPageComponent } from './home-calipso-page/home-calipso-page.component'


import { AboutCalipsoPageComponent } from './about-calipso-page/about-calipso-page.component'
import { PartnersCalipsoPageComponent } from './partners-calipso-page/partners-calipso-page.component'

const routes: Routes = [
  { path: '', component: HomeCalipsoPageComponent },
  { path: 'login', component: LoginCalipsoUserFormComponent },
  { path: 'facility', component: SelectCalipsoFacilityFormComponent },
  { path: 'experiment', component: SelectCalipsoExperimentFormComponent },

  { path: 'about', component: AboutCalipsoPageComponent },
  { path: 'partners', component: PartnersCalipsoPageComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }