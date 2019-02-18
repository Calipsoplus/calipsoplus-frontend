import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCalipsoUserFormComponent } from './login-calipso-user-form/login-calipso-user-form.component';
import { SelectCalipsoResourceFormComponent } from './select-calipso-resource-form/select-calipso-resource-form.component';

import { PartnersCalipsoPageComponent } from './partners-calipso-page/partners-calipso-page.component';
import { SelectCalipsoQuotaFormComponent } from './select-calipso-quota-form/select-calipso-quota-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectCalipsoFavoriteFormComponent } from './select-calipso-favorite-form/select-calipso-favorite-form.component';

import { SelectCalipsoExperimentFormComponent } from './select-calipso-experiment-form/select-calipso-experiment-form.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {CalipsoContainerImagesComponent} from './admin/calipso-container-images/calipso-container-images.component';
import {CalipsoVmImagesComponent} from './admin/calipso-vm-images/calipso-vm-images.component';
import {CalipsoUserProfileComponent} from './admin/calipso-user-profile/calipso-user-profile.component';
import {CalipsoUsersComponent} from './admin/calipso-users/calipso-users.component';

const routes: Routes = [
  { path: '', component: PartnersCalipsoPageComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/container-images', component: CalipsoContainerImagesComponent },
  { path: 'admin/virtual-machine-images', component: CalipsoVmImagesComponent },
  { path: 'admin/user/:username', component: CalipsoUserProfileComponent },
  { path: 'admin/users', component: CalipsoUsersComponent },
  { path: 'autologin', component: LoginCalipsoUserFormComponent },
  { path: 'experiment', component: SelectCalipsoExperimentFormComponent },
  { path: 'favorite', component: SelectCalipsoFavoriteFormComponent },
  { path: 'login', component: LoginCalipsoUserFormComponent },
  { path: 'logout', component: LoginCalipsoUserFormComponent },
  { path: 'quota', component: SelectCalipsoQuotaFormComponent },
  { path: 'resource', component: SelectCalipsoResourceFormComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
