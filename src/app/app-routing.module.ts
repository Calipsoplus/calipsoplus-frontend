import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCalipsoUserFormComponent } from './login-calipso-user-form/login-calipso-user-form.component';
import { SelectCalipsoResourceFormComponent } from './select-calipso-resource-form/select-calipso-resource-form.component';

import { PartnersCalipsoPageComponent } from './partners-calipso-page/partners-calipso-page.component';
import { SelectCalipsoQuotaFormComponent } from './select-calipso-quota-form/select-calipso-quota-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectCalipsoFavoriteFormComponent } from './select-calipso-favorite-form/select-calipso-favorite-form.component';

import { SelectCalipsoExperimentFormComponent } from './select-calipso-experiment-form/select-calipso-experiment-form.component';

const routes: Routes = [
  { path: '', component: PartnersCalipsoPageComponent },
  { path: 'login', component: LoginCalipsoUserFormComponent },
  { path: 'logout', component: LoginCalipsoUserFormComponent },
  { path: 'experiment', component: SelectCalipsoExperimentFormComponent },
  { path: 'resource', component: SelectCalipsoResourceFormComponent },
  { path: 'quota', component: SelectCalipsoQuotaFormComponent },
  { path: 'favorite', component: SelectCalipsoFavoriteFormComponent },
  { path: 'autologin', component: LoginCalipsoUserFormComponent },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
