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

@Injectable()
export class CalipsoplusService {
  backendUrl_calipso = environment.backendUrl_calipso + environment.backendUrl_basehref;
  guacamoleUrl = environment.guacamoleUrl;

  authUrl = this.backendUrl_calipso + "login/";
  umbrellaLoginUrl = this.backendUrl_calipso + "umbrella/login/";

  umbrellaSessionUrl = this.backendUrl_calipso + "umbrella/session/";
  uoUserFromHashUrl = this.backendUrl_calipso + "umbrella/wuo/";

  umbrellaLogoutUrl = this.backendUrl_calipso + "umbrella/logout/";
  logoutUrl = this.backendUrl_calipso + "logout/";

  facilitiesUrl = this.backendUrl_calipso + "facility/";

  favoriteUrl = this.backendUrl_calipso + "favorite/$ID/";

  quotaUrl = this.backendUrl_calipso + "quota/$USERNAME/";
  usedQuotaUrl = this.backendUrl_calipso + "used_quota/$USERNAME/";
  imageQuotaUrl = this.backendUrl_calipso + "image/$PUBLIC_NAME/";
  experimentsUrl = this.backendUrl_calipso + "experiments/$USERNAME/";
  runContainersUrl =
    this.backendUrl_calipso + "container/run/$USERNAME/$EXPERIMENT/";
  removeContainersUrl =
    this.backendUrl_calipso + "container/rm/$USERNAME/$CONTAINER/";
  stopContainersUrl =
    this.backendUrl_calipso + "container/stop/$USERNAME/$CONTAINER/";
  listContainersUrl = this.backendUrl_calipso + "container/list/$USERNAME/";

  settingsCalipsoUrl = this.backendUrl_calipso + "settings/";

  UOWebUrl = "https://useroffice.cells.es/Welcome";


  calipsoSettings:CalipsoSettings=new CalipsoSettings(false);


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

  constructor(private http: HttpClient, private router: Router) {}

  public favorite_experiment(id: string, value: number) {
    let url = this.favoriteUrl.replace("$ID", id);

    var body = `{"favorite":"${value}"}`;

    let server_token = this.getCookie("csrftoken");

    if (server_token == undefined) {
      server_token = "none";
      //console.log("token_not_found!");
    }

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "X-CSRFToken": server_token
    });

    return this.http
      .put(url, body, {
        headers: headers,
        withCredentials: true,
        observe: "response"
      })
      .map(res => {
        return res;
      });
  }

  public getCalipsoExperiments(
    username: string,
    page: Number,
    order: string,
    search_data: string,
    filter: string
  ): Observable<CalipsoPaginationExperiment> {
    let url = this.experimentsUrl.replace("$USERNAME", username);
    url = url.concat("?page=", page.toString(), "&ordering=", order.toString());
    if (search_data != "") url = url.concat("&search=", search_data.toString());

    if (filter != "")
      url = url.concat("&calipsouserexperiment__favorite=" + filter);

    return this.http.get<CalipsoPaginationExperiment>(url, {
      withCredentials: true
    });
  }

  public getCalipsoSettings(): Observable<CalipsoSettings> {
    return this.http.get<CalipsoSettings>(this.settingsCalipsoUrl, {
      withCredentials: true
    });
  }

  public getCalipsoFacilities(): Observable<CalipsoFacility[]> {
    return this.http.get<CalipsoFacility[]>(this.facilitiesUrl);
  }

  public getImageByPublicName(public_name: string): Observable<CalipsoImage[]> {
    let url = this.imageQuotaUrl.replace("$PUBLIC_NAME", public_name);
    return this.http.get<CalipsoImage[]>(url, { withCredentials: true });
  }

  public getCalipsoQuota(username: string): Observable<CalipsoQuota[]> {
    let url = this.quotaUrl.replace("$USERNAME", username);
    return this.http.get<CalipsoQuota[]>(url, { withCredentials: true });
  }

  public getCalipsoAvailableImageQuota(
    username: string
  ): Observable<CalipsoQuota[]> {
    let url = this.usedQuotaUrl.replace("$USERNAME", username);
    return this.http.get<CalipsoQuota[]>(url, { withCredentials: true });
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
    var body = `{"username":"${username}","password":"${password}"}`;
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http
      .post(this.authUrl, body, {
        headers: headers,
        observe: "response",
        withCredentials: true
      })
      .map(res => {
        this.login(username,"local");
        return res;
      });
  }

  getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2)
      return parts
        .pop()
        .split(";")
        .shift();
  }

  public getAvalilableSoftware(): Observable<CalipsoSoftware[]> {
    return of(this.SOFTWARE);
  }

  public unauth() {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    localStorage.removeItem("ct");
    return this.http
      .get(this.logoutUrl, {
        headers: headers,
        observe: "response",
        withCredentials: true
      })
      .map(res => {
        localStorage.removeItem("ct");
        localStorage.removeItem("cb");
      });
  }

  public unauthUmbrella() {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http
      .get(this.umbrellaLogoutUrl, {
        headers: headers,
        observe: "response",
        withCredentials: true
      })
      .map(res => {
        localStorage.removeItem("ct");
        localStorage.removeItem("cb");
      });
  }

  public login(username:string,local_login:string) {
    localStorage.setItem("ct", username);
    localStorage.setItem("cb", local_login);
  }

  public getLoginType() {
    return localStorage.getItem("cb");
  }


  public getLoggedUserName(): string {
    return localStorage.getItem("ct");
  }

  public isLogged(): boolean {
    return "ct" in localStorage;
  }

  public listContainersActive(
    username: string
  ): Observable<CalipsoContainer[]> {
    let url = this.listContainersUrl.replace("$USERNAME", username);
    return this.http.get<CalipsoContainer[]>(url, { withCredentials: true });
  }

  public runContainer(
    username: string,
    experiment: string
  ): Observable<CalipsoContainer> {
    let url = this.runContainersUrl.replace("$USERNAME", username);
    let run_url = url.replace("$EXPERIMENT", experiment);
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http
      .get<CalipsoContainer>(run_url, {
        headers: headers,
        withCredentials: true,
        observe: "response"
      })
      .map(res => {
        return res.body;
      });
  }

  public removeContainer(
    username: string,
    experiment_serial_number: string
  ): Observable<CalipsoContainer> {
    let remove_url = this.removeContainersUrl.replace("$USERNAME", username);
    let url = remove_url.replace("$CONTAINER", experiment_serial_number);

    return this.http
      .get<CalipsoContainer>(url, { withCredentials: true })
      .map(res => {
        return res;
      });
  }

  public stopContainer(
    username: string,
    experiment_serial_number: string
  ): Observable<CalipsoContainer> {
    let stop_url = this.stopContainersUrl.replace("$USERNAME", username);
    let url = stop_url.replace("$CONTAINER", experiment_serial_number);

    return this.http
      .get<CalipsoContainer>(url, { withCredentials: true })
      .map(res => {
        return res;
      });
  }

  public formatDate(date: Date) {
    let str_date =
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();
    return str_date;
  }
  public removeDateAccess(container_name: string) {
    localStorage.removeItem(container_name);
  }
  public updateDateAccess(container_name: string) {
    let date_access = new Date();
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
    var paramenters = btoa("un=" + username + "&up=" + password);
    window.open(
      this.guacamoleUrl + "?t=" + paramenters,
      container_name,
      "menubar=no, location=no, toolbar=no, scrollbars=yes, height=500"
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
    var body = `{"EAAHash":"${eaahash}", "uid":"${username}"}`;

    let server_token = this.getCookie("csrftoken");

    if (server_token == undefined) {
      server_token = "none";
      //console.log("token_not_found!");
    }

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "X-CSRFToken": server_token
    });

    return this.http
      .post(this.uoUserFromHashUrl, body, {
        headers: headers,
        observe: "response",
        withCredentials: true
      })
      .map(res => {
        return res;
      })
      .catch(function(e) {
        //console.log("Error: ", e);
        throw e;
      });
  }

  public goExternalLoginUmbrella() {
    //console.log("Go to umbrella login page");
    window.location.href = this.umbrellaLoginUrl;
  }

  public goExternalLoginWOU(){
    //console.log("Go to UO page");
    window.location.href = this.UOWebUrl;
  }



}
