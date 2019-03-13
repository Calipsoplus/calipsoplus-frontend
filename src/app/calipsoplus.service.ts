import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CalipsoFacility } from './calipso-facility';
import { CalipsoExperiment } from './calipso-experiment';

import { CalipsoContainer } from './calipso-container';
import { CalipsoQuota } from './calipso-quota';
import { CalipsoImage } from './calipso-image';

import { Router } from '@angular/router';
import { CalipsoPaginationExperiment } from './calipso-pagination-experiment';
import { CalipsoUmbrellaSession } from './calipso-umbrella-session';
import { CalipsoSettings } from './calipso-settings';
import { LOGO_FACILITY } from './calipso-constants';
import { CalipsoUserType } from './calipso-user-type';
import {CalipsoPaginationUser} from './CalipsoPaginationUser';
import {CalipsoUser} from './calipso-user';

@Injectable({providedIn: 'root'})
export class CalipsoplusService {
  backendUrl_calipso = environment.backendUrl_calipso + environment.backendUrl_basehref;
  guacamoleUrl = environment.guacamoleUrl;

  authUrl = this.backendUrl_calipso + 'login/';
  umbrellaLoginUrl = this.backendUrl_calipso + 'umbrella/login/';

  umbrellaSessionUrl = this.backendUrl_calipso + 'umbrella/session/';
  uoUserFromHashUrl = this.backendUrl_calipso + 'umbrella/wuo/';

  umbrellaLogoutUrl = this.backendUrl_calipso + 'umbrella/logout/';
  logoutUrl = this.backendUrl_calipso + 'logout/';

  favoriteUrl = this.backendUrl_calipso + 'favorite/$ID/';
  quotaUrl = this.backendUrl_calipso + 'quota/$USERNAME/';
  usedQuotaUrl = this.backendUrl_calipso + 'used_quota/$USERNAME/';
  imageUrl = this.backendUrl_calipso + 'image/$PUBLIC_NAME/';
  imageListUrl = this.backendUrl_calipso + 'images/';
  experimentsUrl = this.backendUrl_calipso + 'experiments/$USERNAME/';
  runResourceUrl = this.backendUrl_calipso + 'resource/run/$USERNAME/$EXPERIMENT/$BASE_IMAGE/';
  removeResourceUrl = this.backendUrl_calipso + 'resource/rm/$USERNAME/$RESOURCE/$PUBLIC_NAME/';
  stopResourceUrl = this.backendUrl_calipso + 'resource/stop/$USERNAME/$RESOURCE/$PUBLIC_NAME/';
  listResourceUrl = this.backendUrl_calipso + 'resource/list/$USERNAME/';
  usersUrl = this.backendUrl_calipso + 'users/';
  userUrl = this.backendUrl_calipso + 'user/$USERNAME/';

  settingsCalipsoUrl = this.backendUrl_calipso + 'settings/';

  calipsoUserTypeUrl = this.backendUrl_calipso + 'login/type/';

  UOWebUrl = 'https://useroffice.cells.es/Welcome';

  defaultCalipsoSettings: CalipsoSettings = new CalipsoSettings(false);

  constructor(private http: HttpClient, private router: Router) {}

  public favorite_experiment(id: string, value: number) {
    const url = this.favoriteUrl.replace('$ID', id);

    const body = `{"favorite":"${value}"}`;

    let server_token = this.getCookie('csrftoken');

    if (server_token === undefined) {
      server_token = 'none';
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let url = this.experimentsUrl.replace('$USERNAME', username);
    url = url.concat('?page=', page.toString(), '&ordering=', order.toString());
    if (search_data !== '') { url = url.concat('&search=', search_data.toString()); }

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
    return this.http.get<CalipsoFacility[]>(environment.frontend_calipso + 'assets/data/facilities.json');
  }
  public getImageQuotaByPublicName(
    public_name: string): Observable<CalipsoImage> {
    const url = this.imageUrl.replace('$PUBLIC_NAME', public_name);
    return this.http.get<CalipsoImage>(url, { withCredentials: true });
  }

  public addNewImage(newImage: CalipsoImage) {
    let server_token = this.getCookie('csrftoken');
    if (server_token === undefined) {
      server_token = 'none';
      // console.log("token_not_found!");
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': server_token
    });
    const url = this.imageUrl.replace('$PUBLIC_NAME', newImage.public_name.trim());
    return this.http.post(url,
      {
        'public_name':  newImage.public_name.trim(),
        'image':  newImage.image.trim(),
        'protocol': newImage.protocol.trim(),
        'cpu': newImage.cpu,
        'memory': newImage.memory.trim(),
        'hdd': newImage.hdd.trim(),
        'resource_type': 'docker'
      }, { headers: headers, withCredentials: true})
      .subscribe(
        resp  => {
          console.log('Response', resp);
        },
        error  => {
          console.log('Error', error);
        }
      );
  }

  public addNewVmImage(newImage: CalipsoImage) {
    let server_token = this.getCookie('csrftoken');
    if (server_token === undefined) {
      server_token = 'none';
      console.log('token_not_found!');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': server_token
    });
    const url = this.imageUrl.replace('$PUBLIC_NAME', newImage.public_name.trim());
    return this.http.post(url,
      {
        'public_name':  newImage.public_name.trim(),
        'image':  newImage.image.trim(),
        'flavor': newImage.flavor,
        'protocol': '',
        'cpu': '',
        'memory': '',
        'hdd': '',
        'resource_type': 'virtual machine'
      }, { headers: headers, withCredentials: true})
      .subscribe(
        resp  => {
          console.log('Response', resp);
        },
        error  => {
          console.log('Error', error);
        }
      );
  }

  public getAllAvailableImages(): Observable<CalipsoImage[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<CalipsoImage[]>(this.imageListUrl, { headers: headers, withCredentials: true });
  }


  public getCalipsoQuota(username: string): Observable<CalipsoQuota> {
    const url = this.quotaUrl.replace('$USERNAME', username);
    return this.http.get<CalipsoQuota>(url, { withCredentials: true });
  }

  public getCalipsoAvailableImageQuota(username: string): Observable<CalipsoQuota> {
    // TODO: Check this is used or available url
    const url = this.usedQuotaUrl.replace('$USERNAME', username);
    return this.http.get<CalipsoQuota>(url, { withCredentials: true });
  }

  public getUsers( page: number, order: string, search_data: string): Observable<CalipsoPaginationUser> {
    let url = this.usersUrl;
    url = url.concat('?page=', page.toString(), '&ordering=', order.toString());
    if (search_data !== '') { url = url.concat('&search=', search_data.toString()); }

    return this.http.get<CalipsoPaginationUser>(url, {
      withCredentials: true
    });
  }

  public getCalipsoUser(username: string): Observable<CalipsoUser> {
    const url = this.userUrl.replace('$USERNAME', username);
    return this.http.get<CalipsoUser>(url, {withCredentials: true});
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
        // console.log("login:", this.getCookie("sessionid"));
        this.login(username, 'local');
        return res;
      });
  }

  public getCookie(name: string) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts
        .pop()
        .split(';')
        .shift();
    }
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
    sessionStorage.removeItem('ct');
    sessionStorage.removeItem('cb');
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
    const url = this.listResourceUrl.replace('$USERNAME', username);
    return this.http.get<CalipsoContainer[]>(url, { withCredentials: true });
  }

  public runResource(
    username: string,
    experiment: string,
    base_image: string
  ): Observable<CalipsoContainer> {
    const url = this.runResourceUrl.replace('$USERNAME', username);
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
    resource_name: string,
    public_name: string
  ): Observable<CalipsoContainer> {
    const username_url = this.removeResourceUrl.replace('$USERNAME', username);
    const remove_url = username_url.replace('$PUBLIC_NAME', public_name);
    const url = remove_url.replace('$RESOURCE', resource_name);

    return this.http
      .get<CalipsoContainer>(url, { withCredentials: true })
      .map(res => {
        return res;
      });
  }

  public stopContainer(
    username: string,
    resource_name: string,
    public_name: string
  ): Observable<CalipsoContainer> {
    const username_url = this.stopResourceUrl.replace('$USERNAME', username);
    const stop_url = username_url.replace('$PUBLIC_NAME', public_name);
    const url = stop_url.replace('$RESOURCE', resource_name);

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
  public removeDateAccess(resource_name: string) {
    localStorage.removeItem(resource_name);
  }
  public updateDateAccess(resource_name: string) {
    const date_access = new Date();
    localStorage.setItem(resource_name, this.formatDate(date_access));
  }
  public getDateAccess(resource_name: string) {
    return localStorage.getItem(resource_name);
  }

  public go_into_resource(resource_name: string, username: string, password: string) {
    this.updateDateAccess(resource_name);
    const paramenters = btoa('un=' + username + '&up=' + password);
    window.open(
      this.guacamoleUrl + '?t=' + paramenters,
      resource_name,
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

  public goOpenIdConnect() {
    window.location.href = environment.openIdConnectUrl;
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

    if (this.getLoginType() === 'local') {
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


  public get_icon(base_image: string) {
    return('assets/images/computer.jpg');
  }
}
