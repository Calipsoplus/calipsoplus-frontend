import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import {CalipsoUser} from './calipso-user';
import {CalipsoUmbrellaSession} from './calipso-umbrella-session';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  backendUrl_calipso = environment.servers.api.url + environment.servers.api.basehref;

  authUrl = this.backendUrl_calipso + 'login/';
  umbrellaLoginUrl = this.backendUrl_calipso + 'umbrella/login/';
  umbrellaSessionUrl = this.backendUrl_calipso + 'umbrella/session/';
  uoUserFromHashUrl = this.backendUrl_calipso + 'umbrella/wuo/';
  umbrellaLogoutUrl = this.backendUrl_calipso + 'umbrella/logout/';
  logoutUrl = this.backendUrl_calipso + 'logout/';
  userUrl = this.backendUrl_calipso + 'user/$USERNAME/';
  UOWebUrl = environment.auth.useroffice.url;

  constructor(private http: HttpClient, private router: Router) { }

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
    if ('ct' in sessionStorage) {
      return 'ct' in sessionStorage;
    }
    if (environment.auth.oidc.enabled) {
      this.openIdAuth();
    }
    return 'ct' in sessionStorage;

  }

  public getCalipsoUser(username: string): Observable<CalipsoUser> {
    const url = this.userUrl.replace('$USERNAME', username);
    return this.http.get<CalipsoUser>(url, {withCredentials: true});
  }

  public isAdmin(): Promise<boolean> {
    const username = this.getLoggedUserName();
    return this.getCalipsoUser(username)
      .toPromise()
      .then((res) => {
        return res.user.is_superuser;
      })
      .catch((err) => {
        if (!environment.auth.oidc.enabled) {
          window.location.href = environment.frontend.url + 'login';
        } else {
          this.openIdAuth();
        }
        console.error(err);
        return false;
      });
  }

  public openIdAuth() {
    this.http.get(this.backendUrl_calipso + 'authenticated/', {withCredentials: true, observe: 'response'})
      .subscribe((response) => {
        if (response.status === 200) {
          const username = response.body['username'];
          this.login(username, 'OpenID');
        }
        this.goOpenIdConnect();
      });
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

  public logout() {
    // console.log("login_local:"+this.calipsoService.calipsoSettings.local_auth);

    if (this.getLoginType() === 'local' || this.getLoginType() === 'OpenID') {
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
          window.location.href =
            environment.servers.api.url +
            'Shibboleth.sso/Logout?return=' +
            environment.frontend.url;
        },
        error => {
          console.error(error);
        }
      );
    }
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

  public authWithEAAHash(username: string, eaahash) {
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

    return this.http.post(this.uoUserFromHashUrl, body, {
      headers: headers,
      observe: 'response',
      withCredentials: true
    })
      .map(res => {
        return res;
      });
  }

  public goExternalLoginUmbrella() {
    window.location.href = this.umbrellaLoginUrl;
  }

  public goOpenIdConnect() {
    window.location.href = environment.auth.oidc.url;
  }

  public goExternalLoginWOU() {
    // console.log("Go to UO page");
    window.location.href = this.UOWebUrl;
  }
}
