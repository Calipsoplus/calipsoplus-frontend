import { Component, OnInit } from '@angular/core';
import { CalipsoplusService } from '../calipsoplus.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private calipsoService: CalipsoplusService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.router.url === '/autologin') {
      this.authService.unauthUmbrella().subscribe(unauth_resp => {
        this.authService.getUmbrellaSession().subscribe(
          session_resp => {
            const username = session_resp.uid;
            const EAAHash = session_resp.EAAHash;

            this.authService.authWithEAAHash(username, EAAHash).subscribe(
              user_resp => {
                // console.log(user_resp);
                this.authService.login(username, 'umbrella');
                this.router.navigate(['/login']);
              },
              error => {
                if (error.status === 404) {
                  // console.log("User in UO not found or not linked..");
                  this.authService.goExternalLoginWOU();
                }
              }
            );
          },
          error => {
            // console.log("No session found.. go to umbrella page");
            this.authService.goExternalLoginUmbrella();
          }
        );
      });
    }
  }
  public getUserName(): string {
    return this.authService.getLoggedUserName();
  }

  public isLogged(): boolean {
    return this.authService.isLogged();
  }

  public logout() {
    // console.log("login_local:"+this.calipsoService.calipsoSettings.local_auth);
    if (this.authService.getLoginType() === 'local') {
      this.authService.unauth().subscribe(
        resp => {
          // console.log("logout done from UO");
          this.router.navigate(['/']);
        },
        error => {
          // console.log("Error in UO logout");
        }
      );
    } else {
      this.authService.unauthUmbrella().subscribe(
        resp => {
          // console.log("logout done from umbrella");
          window.location.href =
            environment.servers.api.url +
            'Shibboleth.sso/Logout?return=' +
            environment.frontend.url;
        },
        error => {
          // console.log("Error in umbrella logout");
        }
      );
    }
  }

  public login() {
    this.router.navigate(['/login']);
  }

  public getFrontendUrl() {
    return environment.frontend.url;
  }
}
