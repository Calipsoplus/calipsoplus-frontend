import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
import { CalipsoSettings } from './calipso-settings';
import { CalipsoUserType } from './calipso-user-type';
import {CalipsoPaginationUser} from './CalipsoPaginationUser';

@Injectable({providedIn: 'root'})
export class CalipsoplusService {
  backendUrl_calipso = environment.servers.api.url + environment.servers.api.basehref;
  guacamoleUrl = environment.servers.guacamole.url;

  favoriteUrl = this.backendUrl_calipso + 'favorite/$ID/';
  quotaUrl = this.backendUrl_calipso + 'quota/$USERNAME/';
  usedQuotaUrl = this.backendUrl_calipso + 'used_quota/$USERNAME/';
  imageUrl = this.backendUrl_calipso + 'images/$PUBLIC_NAME/';
  imageListUrl = this.backendUrl_calipso + 'images/';
  experimentsUrl = this.backendUrl_calipso + 'users/$USERNAME/experiments/';
  runResourceUrl = this.backendUrl_calipso + 'resource/run/$USERNAME/$EXPERIMENT/$BASE_IMAGE/';
  removeResourceUrl = this.backendUrl_calipso + 'resource/rm/$USERNAME/$RESOURCE/$PUBLIC_NAME/';
  stopResourceUrl = this.backendUrl_calipso + 'resource/stop/$USERNAME/$RESOURCE/$PUBLIC_NAME/';
  listResourceUrl = this.backendUrl_calipso + 'resource/list/$USERNAME/';
  usersUrl = this.backendUrl_calipso + 'users/';
  userUrl = this.backendUrl_calipso + 'users/$USERNAME/';

  settingsCalipsoUrl = this.backendUrl_calipso + 'settings/';

  calipsoUserTypeUrl = this.backendUrl_calipso + 'login/type/';


  defaultCalipsoSettings: CalipsoSettings = new CalipsoSettings(false);

  constructor(private http: HttpClient) {}

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

    return this.http.put(url, body, {
        headers: headers,
        withCredentials: true,
        observe: 'response'
      })
      .map(res => {
        return res;
      });
  }

  public getMyLogo(): string {
    return environment.frontend.facilityLogo;
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
    return this.http.get<CalipsoFacility[]>(environment.frontend.url + 'assets/data/facilities.json');
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
          console.error(error);
        }
      );
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

  public listContainersActive(username: string): Observable<CalipsoContainer[]> {
    const url = this.listResourceUrl.replace('$USERNAME', username);
    return this.http.get<CalipsoContainer[]>(url, { withCredentials: true });
  }

  public runResource(username: string, experiment: string, base_image: string): Observable<CalipsoContainer> {
    const url = this.runResourceUrl.replace('$USERNAME', username);
    const mid_url = url.replace('$EXPERIMENT', experiment);
    const run_url = mid_url.replace('$BASE_IMAGE', base_image);

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<CalipsoContainer>(run_url, {
        headers: headers,
        withCredentials: true,
        observe: 'response'
      })
      .map(res => {
        return res.body;
      });
  }

  public removeContainer(username: string, resource_name: string, public_name: string): Observable<CalipsoContainer> {
    const username_url = this.removeResourceUrl.replace('$USERNAME', username);
    const remove_url = username_url.replace('$PUBLIC_NAME', public_name);
    const url = remove_url.replace('$RESOURCE', resource_name);

    return this.http.get<CalipsoContainer>(url, { withCredentials: true })
      .map(res => {
        return res;
      });
  }

  public stopContainer(username: string, resource_name: string, public_name: string): Observable<CalipsoContainer> {
    const username_url = this.stopResourceUrl.replace('$USERNAME', username);
    const stop_url = username_url.replace('$PUBLIC_NAME', public_name);
    const url = stop_url.replace('$RESOURCE', resource_name);

    return this.http.get<CalipsoContainer>(url, { withCredentials: true })
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

  public get_icon() {
    return('assets/images/computer.jpg');
  }

  public openURL(url: string, name: string) {
    this.updateDateAccess(name);
    window.open(url, '_blank');
  }
}
