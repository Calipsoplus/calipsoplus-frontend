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
import { CalipsoContainer } from "./calipso-container";

@Injectable()
export class CalipsoplusService {
  backendUrl_calipso = "https://misapptest.cells.es/calipsoplus-services/";
  guacamoleUrl = "http://calipsotest.cells.es:8080/"

  //backendUrl_calipso = "http://192.168.33.11:8000/";
  //guacamoleUrl = "http://192.168.33.15:8080/"


  authUrl = this.backendUrl_calipso + "login/";
  facilitiesUrl = this.backendUrl_calipso + "facility/all/";
  experimentsUrl = this.backendUrl_calipso + "user/$USERNAME/experiment/";
  runContainersUrl = this.backendUrl_calipso +
  "container/run/$USERNAME/$EXPERIMENT/";
  removeContainersUrl = this.backendUrl_calipso + "container/rm/$CONTAINER/";
  stopContainersUrl = this.backendUrl_calipso + "container/stop/$CONTAINER/";
  listContainersUrl = this.backendUrl_calipso + "container/list/$USERNAME/";

  DATASETS: CalipsoDataset[] = [
    {
      id: 1,
      subject: "Dataset 1",
      type: "FAT32",
      location: "/srv/datasets1/d1A1.dst"
    },
    {
      id: 2,
      subject: "Dataset 2",
      type: "FAT64",
      location: "/srv/datasets1/d1A2.dst"
    },
    {
      id: 3,
      subject: "Dataset 3",
      type: "PNG",
      location: "/srv/datasets2/d2A1.dst"
    }
  ];

  SOFTWARE: CalipsoSoftware[] = [
    { id: 1, subject: "Phynix", command: "./phynix.sh" },
    { id: 2, subject: "Tree", command: "./tree.sh" },
    { id: 3, subject: "Fixme", command: "./fixme.sh" },
    { id: 4, subject: "Cati", command: "./cati.sh" },
    { id: 5, subject: "Jomsa", command: "./jomsa_start.sh" },
    { id: 6, subject: "Mayson", command: "./mayson.sh" }
  ];

  EXPERIMENTS: CalipsoExperiment[] = [];

  constructor(private http: HttpClient) {}

  public getCalipsoExperiments(
    username: string
  ): Observable<CalipsoExperiment[]> {
    let url = this.experimentsUrl.replace("$USERNAME", username);
    return this.http.get<CalipsoExperiment[]>(url);
  }

  public getCalipsoFacilities(): Observable<CalipsoFacility[]> {
    return this.http.get<CalipsoFacility[]>(this.facilitiesUrl);
  }

  public getDatasetsFromExperiment(
    experiment_id
  ): Observable<CalipsoDataset[]> {
    return of(this.DATASETS);
  }

  public getSoftware(): Observable<CalipsoSoftware[]> {
    return of(this.SOFTWARE);
  }

  public auth(username: string, password: string) {
    this.logout();
    let params = "username=" + username + "&password=" + password;
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );

    return this.http
      .post(this.authUrl, params, { headers: headers })
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

  public isLogged(): boolean {
    return "c_username" in sessionStorage;
  }

  public listContainersActive(
    username: string
  ): Observable<CalipsoContainer[]> {
    let url = this.listContainersUrl.replace("$USERNAME", username);
    return this.http.get<CalipsoContainer[]>(url);
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    errMsg = error.message ? error.message : error.toString();
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public runContainer(
    username: string,
    experiment: string
  ): Observable<CalipsoContainer> {
    let url = this.runContainersUrl.replace("$USERNAME", username);
    let run_url = url.replace("$EXPERIMENT", experiment);

    let params = "";
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded; charset=UTF-8"
    );

    return this.http
      .post<CalipsoContainer>(run_url, params, { headers: headers })
      .map(res => {
        return res;
      })
      .catch(this.handleError);
  }

  public removeContainer(
    experiment_serial_number: string
  ): Observable<CalipsoContainer> {
    let url = this.removeContainersUrl.replace(
      "$CONTAINER",
      experiment_serial_number
    );
    return this.http.get<CalipsoContainer>(url).map(res => {
      //return JSON.stringify(res);
      return res;
    });
  }

  public stopContainer(
    experiment_serial_number: string
  ): Observable<CalipsoContainer> {
    let url = this.stopContainersUrl.replace(
      "$CONTAINER",
      experiment_serial_number
    );
    return this.http.get<CalipsoContainer>(url).map(res => {
      //return JSON.stringify(res);
      return res;
    });
  }
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
