import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { catchError } from "rxjs/operators";

import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
  HttpParams
} from "@angular/common/http";

import { CalipsoUser } from "./calipso-user";
import { CalipsoFacility } from "./calipso-facility";
import { CalipsoExperiment } from "./calipso-experiment";
import { CalipsoDataset } from "./calipso-dataset";
import { CalipsoSoftware } from "./calipso-software";

@Injectable()
export class CalipsoplusService {
  backendUrl_calipso = "https://misapptest.cells.es/calipsoplus-services/";
  backendUrl_duo = "https://misapptest.cells.es/duo-services/";
  //backendUrl_calipso = "http://192.168.33.11:8000/";


  authUrl = this.backendUrl_duo + "login/";
  facilitiesUrl = this.backendUrl_calipso + "facility/all/";
  experimentsUrl = this.backendUrl_calipso + "experiment/$USERNAME/";


  DATASETS: CalipsoDataset[] = [
    { id: 1, subject: "Dataset 1", type : "FAT32", location:"/srv/datasets1/d1A1.dst" },
    { id: 2, subject: "Dataset 2", type : "FAT64", location:"/srv/datasets1/d1A2.dst" },
    { id: 3, subject: "Dataset 3", type : "PNG", location:"/srv/datasets2/d2A1.dst" },
    { id: 4, subject: "Dataset 4", type : "IOS", location:"/srv/datasets2/d2A2.dst" },
    { id: 5, subject: "Dataset 5", type : "LX64", location:"/srv/datasets3/d3A1.dst" },
    { id: 6, subject: "Dataset 6", type : "AMD32", location:"/srv/datasets3/d3A2.dst" },
    { id: 7, subject: "Dataset 7", type : "BIN", location:"/srv/datasets4/d4A1.dst" },
    { id: 8, subject: "Dataset 8", type : "SET", location:"/srv/datasets4/d4A2.dst" },
    { id: 9, subject: "Dataset 9", type : "JPS", location:"/srv/datasets4/d4A3.dst" },
    { id: 10, subject: "Dataset 10", type : "MKR", location:"/srv/datasets5/d5A1.dst" }];

  SOFTWARE: CalipsoSoftware[] = [
    { id: 1, subject: "Phynix", command:"./phynix.sh" },
    { id: 2, subject: "Tree", command:"./tree.sh" },
    { id: 3, subject: "Fixme", command:"./fixme.sh" },
    { id: 4, subject: "Cati", command:"./cati.sh" },
    { id: 5, subject: "Jomsa", command:"./jomsa_start.sh" },
    { id: 6, subject: "Mayson", command:"./mayson.sh" }];

  EXPERIMENTS: CalipsoExperiment[] = [
    { id: 201800221, subject: "Experiment 1", body:"ALorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" },
    { id: 201800423, subject: "Experiment 2", body:"BLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" },
    { id: 201800322, subject: "Experiment 3", body:"CLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" },
    { id: 201802013, subject: "Experiment 4", body:"DLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" }];


  constructor(private http: HttpClient) {}

  public getCalipsoExperiments(
    username: string
  ): Observable<CalipsoExperiment[]> {
//    let url = this.experimentsUrl.replace("$USERNAME", username);
//    return this.http.get<CalipsoExperiment[]>(url);

    return of(this.EXPERIMENTS);

  }

  public getCalipsoFacilities(): Observable<CalipsoFacility[]> {
    return this.http.get<CalipsoFacility[]>(this.facilitiesUrl);
  }

  public getDatasetsFromExperiment(experiment_id): Observable<CalipsoDataset[]> {
    return of(this.DATASETS);
  }

  public getSoftware(): Observable<CalipsoSoftware[]> {
    return of(this.SOFTWARE);
  }

  public auth(username: string, password: string) {
    this.logout();
    let data = "{\"withCredentials\":true, \"username\":\""+username+"\",\"password\":\""+password+"\"}"

    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/json; charset=UTF-8"
    );

    return this.http
      //.post(this.authUrl, data, { headers: headers, withCredentials:true })
      .post(this.authUrl, data, { headers: headers})
      .map(res => {
        this.login(username, JSON.stringify(res));
        return res;
      });
  }

  public getAvalilableSoftware(): Observable<CalipsoSoftware[]> {
    return of(this.SOFTWARE);
  }

  public logout() {
    sessionStorage.removeItem("c_username");
    //sessionStorage.removeItem("c_user_calipso");
  }

  private login(username: string, json_user: string) {
    sessionStorage.setItem("c_username", username);
    //sessionStorage.setItem("c_user_calipso", json_user);
  }

  public getLoggedUserName(): string {
    return sessionStorage.getItem("c_username");
  }

  /*public getLoggedCalipsoUser(): string {
    return sessionStorage.getItem("c_user_calipso");
  }*/

  public isLogged(): boolean {
    return "c_username" in sessionStorage;
  }

 // public getLoogedUserId(): string {
 //   return JSON.parse(this.getLoggedCalipsoUser()).user_id;
 // }

}

/*
const Authorization = authService.getToken(); //read the token from storahe
const authReq = req.clone({ headers: req.headers.set('authorization', Authorization) }); // Clone the request to add the authorization header.
return next.handle(authReq); // Pass on the cloned request instead of the original request.
*/

/*
return next.handle(authReq)
   .catch((error, caught) => {
      if (error.status === 401) {
        //logout users, redirect to login page
        authService.removeTokens();
        //redirect to the signin page or show login modal here
        this.router.navigate(['/auth/signin]); //remember to import router class and declare it in the class
        return Observable.throw(error);
    } else {
        return Observable.throw(error);
    }
}) as any;
*/

/*
 refreshToken(): Observable<string> {
    let refreshAuth = this.getRefreshToken(); //get refresh token from storage
    let url: string = BASE_URL + "auth/refresh";
    return this.http.get(url, {
      headers: new HttpHeaders().set('refreshAuthorization', refreshAuth),
      observe: 'response'
    }).map(refreshResponse => {
      let authToken: string = refreshResponse.headers.get('authorizationToken');
      let refreshToken: string = refreshResponse.headers.get('refreshToken');
      //add token to storage
      this.createToken(authToken, refreshToken); // method for adding token to cookie storage
      return authToken; //return the new authorization token
    });
  }
  */

/*
  if (error.status === 419) {
  return authService.refreshToken().flatmap(t => {
    this.inflightAuthRequest = null;
    const authReq = req.clone({ headers: req.headers.set('authorization', t) });
    return next.handle(authReq); //refresh was success, resend the original request
  });
}
*/
