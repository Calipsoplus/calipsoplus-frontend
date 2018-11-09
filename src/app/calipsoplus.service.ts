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

@Injectable()
export class CalipsoplusService {
  backendUrl_calipso =
    environment.backendUrl_calipso + environment.backendUrl_basehref;
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
    this.backendUrl_calipso +
    "container/run/$USERNAME/$EXPERIMENT/$BASE_IMAGE/";
  removeContainersUrl =
    this.backendUrl_calipso + "container/rm/$USERNAME/$CONTAINER/";
  stopContainersUrl =
    this.backendUrl_calipso + "container/stop/$USERNAME/$CONTAINER/";
  listContainersUrl = this.backendUrl_calipso + "container/list/$USERNAME/";

  settingsCalipsoUrl = this.backendUrl_calipso + "settings/";

  UOWebUrl = "https://useroffice.cells.es/Welcome";

  defaultCalipsoSettings: CalipsoSettings = new CalipsoSettings(false);

  FACILITIES: CalipsoFacility[] = [
    {
      id: 1,
      name: "ALBA Light Source",
      description:
        "ALBA is a 3rd generation Synchrotron Light facility located in Cerdanyola del Vallès, (Barcelona), being the newest source in the Mediterranean area. It is a complex of electron accelerators to produce synchrotron light, which allows the visualization of the atomic structure of matter as well as the study of its properties.  The 3 GeV electron beam energy at ALBA is achieved by combining a LInear ACcelerator (LINAC) and a low-emittance, full-energy BOOSTER placed in the same tunnel as the STORAGE RING. ALBA's 270 meter perimeter has 17 straight sections all of which are available for the installation of insertion devices",
      url: environment.frontend_calipso
    },
    {
      id: 7,
      name: "DESY",
      description:
        "DESY is one of the world’s leading accelerator centres. Researchers use the large-scale facilities at DESY to explore the microcosm in all its variety – from the interactions of tiny elementary particles and the behaviour of new types of nanomaterials to biomolecular processes that are essential to life. The accelerators and detectors that DESY develops and builds are unique research tools. The facilities generate the world’s most intense X-ray light, accelerate particles to record energies and open completely new windows onto the universe. ?That makes DESY not only a magnet for more than 3000 guest researchers from over 40 countries every year, but also a coveted partner for national and international cooperations. Committed young researchers find an exciting interdisciplinary setting at DESY. The research centre offers specialized training for a large number of professions. DESY cooperates with industry and business to promote new technologies that will benefit society and encourage innovations. This also benefits the metropolitan regions of the two DESY locations, Hamburg and Zeuthen near Berlin.",
      url: "http://192.168.33.10:8001"
    },
    {
      id: 2,
      name: "Diamond Light Source",
      description:
        "Diamond Light Source is the UK’s national synchrotron. It works like a giant microscope, harnessing the power of electrons to produce bright light that scientists can use to study anything from fossils to jet engines to viruses and vaccines. The machine accelerates electrons to near light speeds so that they give off light 10 billion times brighter than the sun. These bright beams are then directed off into laboratories known as ‘beamlines’. Here, scientists use the light to study a vast range of subject matter, from new medicines and treatments for disease to innovative engineering and cutting-edge technology.",
      url: "http://192.168.33.10:8001"
    },
    {
      id: 3,
      name: "Elettra and FERMI Lightsource",
      description:
        "Elettra Sincrotrone Trieste is a multidisciplinary international research center of excellence, specialized in generating high quality synchrotron and free-electron laser light and applying it in materials and life sciences. Its mission is to promote cultural, social and economic growth through: Basic and applied research; Technology and know-how transfer; Technical, scientific and management education; Role of reference in the national and international scientific networks.",
      url: "http://192.168.33.10:8001"
    },
    {
      id: 5,
      name: "European Synchrotron Radiation Facility",
      description:
        "The ESRF is the world's most intense X-ray source and a centre of excellence for fundamental and innovation-driven research in condensed and living matter science. Located in Grenoble, France, the ESRF owes its success to the international cooperation of 22 partner nations, of which 13 are Members and 9 are Associates.",
      url: "http://192.168.33.10:8001"
    },
    {
      id: 6,
      name: "European XFEL",
      description:
        "The European XFEL is a research facility of superlatives: It generates ultrashort X-ray flashes—27 000 times per second and with a brilliance that is a billion times higher than that of the best conventional X-ray radiation sources.",
      url: "http://192.168.33.10:8001"
    },
    {
      id: 4,
      name: "Helmholz-Zentrum Berlin (HZB)",
      description:
        "Energy materials comprise more than just solar cells. Energy materials also include solar fuels, thermoelectrics, and topological insulators. These are materials that store or convert energy, or enable construction of new energy-efficient information technologies like spintronics. Scientists at HZB are researching these kinds of systems of materials, always with the emphasis on thin-film technologies. We are able to build on the know-how we already acquired in the area of thin-film photovoltaics and that HZB research is known for internationally. Now we are combining the outstanding means of analysis offered in particular at BESSY II and BER II with expanded expertise in materials synthesis, as well as in the field of simulation and theory. Especially interesting research advances at HZB are presented in our annual reports and highlights and through our Research Highlights web pages. You can learn more about the research programmes.",
      url: "http://192.168.33.10:8001"
    },
    {
      id: 9,
      name: "Paul Scherrer Institute",
      description:
        "The Paul Scherrer Institute, PSI, is the largest research institute for natural and engineering sciences within Switzerland. We perform world-class research in three main subject areas: Matter and Material; Energy and the Environment; and Human Health. By conducting fundamental and applied research, we work on long-term solutions for major challenges facing society, industry and science.",
      url: "http://192.168.33.10:8001"
    },
    {
      id: 8,
      name: "Soleil Synchrotron",
      description:
        "High-technology facility, SOLEIL is both an electromagnetic radiation source covering a wide range of energies (from the infrared to the x-rays) and a research laboratory at the cutting edge of experimental techniques dedicated to matter analysis down to the atomic scale, as well as a service platform open to all scientific and industrial communities.",
      url: "http://192.168.33.10:8001"
    },
    {
      id: 10,
      name: "University of Lund",
      description:
        "Lund is the most popular study location in Sweden. The University offers one of the broadest ranges of programmes and courses in Scandinavia, based on cross-disciplinary and cutting-edge research. The University has a distinct international profile, with partner universities in over 70 countries.",
      url: "http://192.168.33.10:8001"
    }
  ];

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
    return of(this.FACILITIES);
    //return this.http.get<CalipsoFacility[]>(this.facilitiesUrl);
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
        this.login(username, "local");
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
    sessionStorage.removeItem("ct");
    return this.http
      .get(this.logoutUrl, {
        headers: headers,
        observe: "response",
        withCredentials: true
      })
      .map(res => {
        this.removeStorage();
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
        this.removeStorage();
      });
  }

  public removeStorage(){
    sessionStorage.removeItem("ct");
    sessionStorage.removeItem("cb");
  }

  public login(username: string, local_login: string) {
    sessionStorage.setItem("ct", username);
    sessionStorage.setItem("cb", local_login);
  }

  public getLoginType() {
    return sessionStorage.getItem("cb");
  }

  public getLoggedUserName(): string {
    return sessionStorage.getItem("ct");
  }

  public isLogged(): boolean {
    return "ct" in sessionStorage;
  }

  public listContainersActive(
    username: string
  ): Observable<CalipsoContainer[]> {
    let url = this.listContainersUrl.replace("$USERNAME", username);
    return this.http.get<CalipsoContainer[]>(url, { withCredentials: true });
  }

  public runContainer(
    username: string,
    experiment: string,
    base_image: string
  ): Observable<CalipsoContainer> {
    let url = this.runContainersUrl.replace("$USERNAME", username);
    let mid_url = url.replace("$EXPERIMENT", experiment);
    let run_url = mid_url.replace("$BASE_IMAGE", base_image);

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

  public goExternalLoginWOU() {
    //console.log("Go to UO page");
    window.location.href = this.UOWebUrl;
  }

  public openURL(url: string, name: string) {
    this.updateDateAccess(name);
    window.open(url, "_blank");
  }

  public logout() {
    //console.log("login_local:"+this.calipsoService.calipsoSettings.local_auth);
    this.removeStorage();

    if (this.getLoginType() == "local") {
      this.unauth().subscribe(
        resp => {
          //console.log("logout done from UO");
          this.router.navigate(["/login"]);
        },
        error => {
          //console.log("Error in UO logout");
        }
      );
    } else {
      this.unauthUmbrella().subscribe(
        resp => {
          //console.log("logout done from umbrella");
          window.location.href =
            environment.backendUrl_calipso +
            "Shibboleth.sso/Logout?return=" +
            environment.frontend_calipso;
        },
        error => {
          //console.log("Error in umbrella logout");
        }
      );
    }
  }



}
