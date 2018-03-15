import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';





import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { CalipsoUser } from './calipso-user'
import { CalipsoFacility } from './calipso-facility'
import { CalipsoExperiment } from './calipso-experiment'

@Injectable()
export class CalipsoplusService {

  authUrl = 'http://192.168.33.11:8000/login/';
  facilitiesUrl = 'http://192.168.33.11:8000/facilities/all/';






  constructor(private http: HttpClient) { }

  public getCalipsoUsers(): Observable<CalipsoUser[]> {

    let fakeUsers = [{ id: 1, username: 'username1', password: 'pass1', firstName: 'firtname1', lastName: 'lastname1' },
    { id: 2, username: 'username2', password: 'pass2', firstName: 'firtname2', lastName: 'lastname2' },
    { id: 3, username: 'username3', password: 'pass3', firstName: 'firtname3', lastName: 'lastname3' }]
    return of(fakeUsers);
  }

  public getCalipsoFacilities_fake(): Observable<CalipsoFacility[]> {

    let fakeFacilities = [{ id: 1, name: 'Spanish ALBA Light Source', description: 'desc1', url: 'https://calipsoplus.facility1.eu' },
    { id: 2, name: 'French synchrotron Soleil', description: 'desc2', url: 'https://calipsoplus.facility2.eu' },
    { id: 3, name: 'Diamond UK Synchrotron', description: 'desc3', url: 'https://calipsoplus.facility3.eu' },
    { id: 4, name: 'Bessy II at Helmholz-Zentrum Berlin (HZB)', description: 'desc4', url: 'https://calipsoplus.facility4.eu' }]
    return of(fakeFacilities);
  }

  public getCalipsoExperiments(): Observable<CalipsoExperiment[]> {

    let fakeExperiments = [{ id: 1, subject: 'Experiment number 1 ref 56/23 from HRZ', body: 'Experiment description body1' },
    { id: 2, subject: 'Experiment number 2 ref 58/13 from MKR', body: 'Experiment description body2' },
    { id: 3, subject: 'Experiment number 3 ref 62/23 from SYNC', body: 'Experiment description body3' },
    { id: 4, subject: 'Experiment number 4 ref 61/3 from ALba', body: 'Experiment description body4' }]
    return of(fakeExperiments);
  }

  public getCalipsoFacilities(): Observable<CalipsoFacility[]> {
    return this.http.get<CalipsoFacility[]>(this.facilitiesUrl);
  }

  public auth(username: string, password: string) {
    this.logout();
    let params = "username=" + username + "&password=" + password;
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.http.post(this.authUrl, params, { headers: headers })
      .map(res => {
        this.login(username);
        return res;
      });
  }


  public logout() {
    sessionStorage.removeItem("loginkey");
  }

  private login(username:string) {
    sessionStorage.setItem("loginkey", username);
  }

  public getUserLogged():string{
    return sessionStorage.getItem("loginkey");
  }


  public isLogged():boolean{
    return "loginkey" in sessionStorage;
  }

}

