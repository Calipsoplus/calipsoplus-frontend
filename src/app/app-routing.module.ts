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
import {AuthGuard} from './guards/auth-guard.service';
import {UserNavComponent} from './user-nav/user-nav.component';
import {AdminGuard} from './guards/admin-guard.service';

export const routes: Routes = [
  { path: '', component: PartnersCalipsoPageComponent },
  { path: 'navigation', component: UserNavComponent, canActivate: [AuthGuard] },
  { path: 'admin', canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'container-images', component: CalipsoContainerImagesComponent },
      { path: 'virtual-machine-images', component: CalipsoVmImagesComponent },
      { path: 'user/:username', component: CalipsoUserProfileComponent },
      { path: 'users', component: CalipsoUsersComponent },
    ]},
  { path: 'autologin', component: LoginCalipsoUserFormComponent },
  { path: 'experiment', component: SelectCalipsoExperimentFormComponent, canActivate: [AuthGuard] },
  { path: 'favorite', component: SelectCalipsoFavoriteFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginCalipsoUserFormComponent, pathMatch: 'full' },
  { path: 'logout', component: LoginCalipsoUserFormComponent },
  { path: 'quota', component: SelectCalipsoQuotaFormComponent, canActivate: [AuthGuard] },
  { path: 'resource', component: SelectCalipsoResourceFormComponent, canActivate: [AuthGuard] },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
