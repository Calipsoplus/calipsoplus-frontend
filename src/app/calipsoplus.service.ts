import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { environment } from "../environments/environment";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { CalipsoFacility } from "./calipso-facility";
import { CalipsoExperiment } from "./calipso-experiment";
import { CalipsoDataset } from "./calipso-dataset";
import { CalipsoSoftware } from "./calipso-software";
import { CalipsoContainer } from "./calipso-container";
import { CalipsoQuota } from "./calipso-quota";
import { CalipsoImage } from "./calipso-image";

import { Router } from "@angular/router";
import { CalipsoPaginationExperiment } from "./calipso-pagination-experiment";
import { CalipsoUmbrellaSession } from "./calipso-umbrella-session";
import { CalipsoSettings } from "./calipso-settings";
import { LOGO_FACILITY } from "./calipso-constants";
import { CalipsoUserType } from "./calipso-user-type";

@Injectable()
export class CalipsoplusService {
  backendUrl_calipso = environment.backendUrl_calipso + environment.backendUrl_basehref;
  guacamoleUrl = environment.guacamoleUrl;

  authUrl = this.backendUrl_calipso + 'login/';
  umbrellaLoginUrl = this.backendUrl_calipso + 'umbrella/login/';

  umbrellaSessionUrl = this.backendUrl_calipso + 'umbrella/session/';
  uoUserFromHashUrl = this.backendUrl_calipso + 'umbrella/wuo/';

  umbrellaLogoutUrl = this.backendUrl_calipso + 'umbrella/logout/';
  logoutUrl = this.backendUrl_calipso + 'logout/';

  facilitiesUrl = this.backendUrl_calipso + 'facility/';

  favoriteUrl = this.backendUrl_calipso + 'favorite/$ID/';

  quotaUrl = this.backendUrl_calipso + 'quota/$USERNAME/';
  usedQuotaUrl = this.backendUrl_calipso + 'used_quota/$USERNAME/';
  imageQuotaUrl = this.backendUrl_calipso + 'image/$PUBLIC_NAME/';
  experimentsUrl = this.backendUrl_calipso + 'experiments/$USERNAME/';
  runContainersUrl =
    this.backendUrl_calipso +
    'container/run/$USERNAME/$EXPERIMENT/$BASE_IMAGE/';
  removeContainersUrl =
    this.backendUrl_calipso + 'container/rm/$USERNAME/$CONTAINER/';
  stopContainersUrl =
    this.backendUrl_calipso + 'container/stop/$USERNAME/$CONTAINER/';
  listContainersUrl = this.backendUrl_calipso + 'container/list/$USERNAME/';

  settingsCalipsoUrl = this.backendUrl_calipso + 'settings/';

  calipsoUserTypeUrl = this.backendUrl_calipso + "login/type/";

  UOWebUrl = "https://useroffice.cells.es/Welcome";

  defaultCalipsoSettings: CalipsoSettings = new CalipsoSettings(false);

  constructor(private http: HttpClient, private router: Router) {}

  public favorite_experiment(id: string, value: number) {
    const url = this.favoriteUrl.replace('$ID', id);

    const body = `{"favorite":"${value}"}`;

    let server_token = this.getCookie('csrftoken');

    if (server_token === undefined) {
      server_token = 'none';
      // console.log("token_not_found!");
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': server_token
    });

    return this.http
      .put(url, body, {
        headers: headers,
        withCredentials: true,
        observe: 'response'
      })
      .map(res => {
        return res;
      });
  }

  public getMyLogo(): string {
    return LOGO_FACILITY;
  }

  public getCalipsoExperiments(
    username: string,
    page: number,
    order: string,
    search_data: string,
    filter: string
  ): Observable<CalipsoPaginationExperiment> {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    let url = this.experimentsUrl.replace("$USERNAME", username);
    url = url.concat("?page=", page.toString(), "&ordering=", order.toString());
    if (search_data != "") url = url.concat("&search=", search_data.toString());


    if (filter !== '') {
      url = url.concat('&calipsouserexperiment__favorite=' + filter);
    }

    return this.http.get<CalipsoPaginationExperiment>(url, {
      headers: headers,
      withCredentials: true
    });
  }

  public getCalipsoSettings(): Observable<CalipsoSettings> {
    return this.http.get<CalipsoSettings>(this.settingsCalipsoUrl, {
      withCredentials: true
    });
  }

  public getCalipsoUserType(): Observable<CalipsoUserType> {
    return this.http
      .get<CalipsoUserType>(this.calipsoUserTypeUrl, {
        withCredentials: true
      })
      .map(res => {
        return res;
      });
  }

  public getCalipsoFacilities(): Observable<CalipsoFacility[]> {
    return this.http.get<CalipsoFacility[]>('../assets/data/facilities.json');
  }

  public getImageByPublicName(public_name: string): Observable<CalipsoImage> {
    let url = this.imageQuotaUrl.replace("$PUBLIC_NAME", public_name);
    return this.http.get<CalipsoImage>(url, { withCredentials: true });
  }

  public getCalipsoQuota(username: string): Observable<CalipsoQuota> {
    let url = this.quotaUrl.replace("$USERNAME", username);
    return this.http.get<CalipsoQuota>(url, { withCredentials: true });
  }

  public getCalipsoAvailableImageQuota(
    username: string
  ): Observable<CalipsoQuota> {
    let url = this.usedQuotaUrl.replace("$USERNAME", username);
    return this.http.get<CalipsoQuota>(url, { withCredentials: true });
  }

  public getDatasetsFromExperiment(experiment_id): Observable<CalipsoDataset[]> {
    return this.http.get<CalipsoDataset[]>('../assets/data/datasets.json');
  }

  public getSoftware(): Observable<CalipsoSoftware[]> {
    return this.http.get<CalipsoSoftware[]>('../assets/data/software.json');
  }

  public auth(username: string, password: string) {
    const body = `{"username":"${username}","password":"${password}"}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .post(this.authUrl, body, {
        headers: headers,
        observe: 'response',
        withCredentials: true
      })
      .map(res => {
        //console.log("login:", this.getCookie("sessionid"));
        this.login(username, "local");
        return res;
      });
  }

  public getCookie(name: string) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts
        .pop()
        .split(';')
        .shift();
    }

  public getAvalilableSoftware(): Observable<CalipsoSoftware[]> {
    return this.http.get<CalipsoSoftware[]>('../assets/data/software.json');
  }

  public unauth() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    sessionStorage.removeItem('ct');
    return this.http
      .get(this.logoutUrl, {
        headers: headers,
        observe: 'response',
        withCredentials: true
      })
      .map(res => {
        this.removeStorage();
      });
  }

  public unauthUmbrella() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .get(this.umbrellaLogoutUrl, {
        headers: headers,
        observe: 'response',
        withCredentials: true
      })
      .map(res => {
        this.removeStorage();
      });
  }

  public removeStorage() {
    sessionStorage.removeItem("ct");
    sessionStorage.removeItem("cb");
  }

  public login(username: string, local_login: string) {
    sessionStorage.setItem('ct', username);
    sessionStorage.setItem('cb', local_login);
  }

  public getLoginType() {
    return sessionStorage.getItem('cb');
  }

  public getLoggedUserName(): string {
    return sessionStorage.getItem('ct');
  }

  public isLogged(): boolean {
    return 'ct' in sessionStorage;
  }

  public listContainersActive(
    username: string
  ): Observable<CalipsoContainer[]> {
    const url = this.listContainersUrl.replace('$USERNAME', username);
    return this.http.get<CalipsoContainer[]>(url, { withCredentials: true });
  }

  public runContainer(
    username: string,
    experiment: string,
    base_image: string
  ): Observable<CalipsoContainer> {
    const url = this.runContainersUrl.replace('$USERNAME', username);
    const mid_url = url.replace('$EXPERIMENT', experiment);
    const run_url = mid_url.replace('$BASE_IMAGE', base_image);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .get<CalipsoContainer>(run_url, {
        headers: headers,
        withCredentials: true,
        observe: 'response'
      })
      .map(res => {
        return res.body;
      });
  }

  public removeContainer(
    username: string,
    experiment_proposal_id: string
  ): Observable<CalipsoContainer> {
    let remove_url = this.removeContainersUrl.replace("$USERNAME", username);
    let url = remove_url.replace("$CONTAINER", experiment_proposal_id);

    return this.http
      .get<CalipsoContainer>(url, { withCredentials: true })
      .map(res => {
        return res;
      });
  }

  public stopContainer(
    username: string,
    experiment_proposal_id: string
  ): Observable<CalipsoContainer> {
    let stop_url = this.stopContainersUrl.replace("$USERNAME", username);
    let url = stop_url.replace("$CONTAINER", experiment_proposal_id);

    return this.http
      .get<CalipsoContainer>(url, { withCredentials: true })
      .map(res => {
        return res;
      });
  }

  public formatDate(date: Date) {
    const str_date =
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes();
    return str_date;
  }
  public removeDateAccess(container_name: string) {
    localStorage.removeItem(container_name);
  }
  public updateDateAccess(container_name: string) {
    const date_access = new Date();
    localStorage.setItem(container_name, this.formatDate(date_access));
  }
  public getDateAccess(container_name: string) {
    return localStorage.getItem(container_name);
  }

  public go_into_container(
    container_name: string,
    username: string,
    password: string
  ) {
    this.updateDateAccess(container_name);
    const paramenters = btoa('un=' + username + '&up=' + password);
    window.open(
      this.guacamoleUrl + '?t=' + paramenters,
      container_name,
      'menubar=no, location=no, toolbar=no, scrollbars=yes, height=500'
    );
  }

  public getUmbrellaSession(): Observable<CalipsoUmbrellaSession> {
    return this.http
      .get<CalipsoUmbrellaSession>(this.umbrellaSessionUrl, {
        withCredentials: true
      })
      .map(res => {
        return res;
      });
  }

  public authWithEAAHash(username: string, eaahash: string) {
    const body = `{"EAAHash":"${eaahash}", "uid":"${username}"}`;

    let server_token = this.getCookie('csrftoken');

    if (server_token === undefined) {
      server_token = 'none';
      // console.log("token_not_found!");
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': server_token
    });

    return this.http
      .post(this.uoUserFromHashUrl, body, {
        headers: headers,
        observe: 'response',
        withCredentials: true
      })
      .map(res => {
        return res;
      })
      .catch(function(e) {
        // console.log("Error: ", e);
        throw e;
      });
  }

  public goExternalLoginUmbrella() {
    // console.log("Go to umbrella login page");
    window.location.href = this.umbrellaLoginUrl;
  }

  public goExternalLoginWOU() {
    // console.log("Go to UO page");
    window.location.href = this.UOWebUrl;
  }

  public openURL(url: string, name: string) {
    this.updateDateAccess(name);
    window.open(url, '_blank');
  }

  public logout() {
    // console.log("login_local:"+this.calipsoService.calipsoSettings.local_auth);

    if (this.getLoginType() == "local") {
      this.removeStorage();
      this.unauth().subscribe(
        resp => {
          // console.log("logout done from UO");
          this.router.navigate(['/']);
        },
        error => {
          // console.log("Error in UO logout");
        }
      );
    } else {
      this.removeStorage();
      this.unauthUmbrella().subscribe(
        resp => {
          // console.log("logout done from umbrella");
          window.location.href =
            environment.backendUrl_calipso +
            'Shibboleth.sso/Logout?return=' +
            environment.frontend_calipso;
        },
        error => {
          // console.log("Error in umbrella logout");
        }
      );
    }
  }
}
