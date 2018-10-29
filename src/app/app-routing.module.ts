import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginCalipsoUserFormComponent } from "./login-calipso-user-form/login-calipso-user-form.component";
import { SelectCalipsoFacilityFormComponent } from "./select-calipso-facility-form/select-calipso-facility-form.component";
import { SelectCalipsoExperimentFormComponent } from "./select-calipso-experiment-form/select-calipso-experiment-form.component";
import { SelectCalipsoResourceFormComponent } from "./select-calipso-resource-form/select-calipso-resource-form.component";

import { HomeCalipsoPageComponent } from "./home-calipso-page/home-calipso-page.component";

import { AboutCalipsoPageComponent } from "./about-calipso-page/about-calipso-page.component";
import { PartnersCalipsoPageComponent } from "./partners-calipso-page/partners-calipso-page.component";
import { SelectCalipsoQuotaFormComponent } from "./select-calipso-quota-form/select-calipso-quota-form.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SelectCalipsoFavoriteFormComponent } from "./select-calipso-favorite-form/select-calipso-favorite-form.component";
import { MainNavComponent } from "./main-nav/main-nav.component";

const routes: Routes = [
  { path: "", component: PartnersCalipsoPageComponent },
  { path: "login", component: LoginCalipsoUserFormComponent },
  { path: "logout", component: LoginCalipsoUserFormComponent },
  //{ path: "facility", component: SelectCalipsoFacilityFormComponent },
  { path: "experiment", component: SelectCalipsoExperimentFormComponent },
  { path: "resource", component: SelectCalipsoResourceFormComponent },
  { path: "quota", component: SelectCalipsoQuotaFormComponent },
  { path: "favorite", component: SelectCalipsoFavoriteFormComponent },
  { path: "autologin", component: LoginCalipsoUserFormComponent },
  //{ path: "about", component: AboutCalipsoPageComponent },
  //{ path: "partners", component: PartnersCalipsoPageComponent },

  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
