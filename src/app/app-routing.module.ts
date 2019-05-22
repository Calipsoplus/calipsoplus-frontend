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
import {AuthGuard} from './auth-guard.service';
import {UserNavComponent} from './user-nav/user-nav.component';

export const routes: Routes = [
  { path: '', component: PartnersCalipsoPageComponent },
  { path: 'navigation', component: UserNavComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  { path: 'admin/container-images', component: CalipsoContainerImagesComponent, canActivate: [AuthGuard] },
  { path: 'admin/virtual-machine-images', component: CalipsoVmImagesComponent, canActivate: [AuthGuard] },
  { path: 'admin/user/:username', component: CalipsoUserProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin/users', component: CalipsoUsersComponent, canActivate: [AuthGuard] },
  { path: 'autologin', component: LoginCalipsoUserFormComponent },
  { path: 'experiment', component: SelectCalipsoExperimentFormComponent },
  { path: 'favorite', component: SelectCalipsoFavoriteFormComponent },
  { path: 'login', component: LoginCalipsoUserFormComponent, pathMatch: 'full' },
  { path: 'logout', component: LoginCalipsoUserFormComponent },
  { path: 'quota', component: SelectCalipsoQuotaFormComponent },
  { path: 'resource', component: SelectCalipsoResourceFormComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
