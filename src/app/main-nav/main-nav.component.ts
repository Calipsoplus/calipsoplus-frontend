import { Component, OnInit } from '@angular/core';
import { CalipsoplusService } from '../calipsoplus.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  constructor(
    private calipsoService: CalipsoplusService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.router.url === '/autologin') {
      this.calipsoService.unauthUmbrella().subscribe(unauth_resp => {
        this.calipsoService.getUmbrellaSession().subscribe(
          session_resp => {
            const username = session_resp.uid;
            const EAAHash = session_resp.EAAHash;

            this.calipsoService.authWithEAAHash(username, EAAHash).subscribe(
              user_resp => {
                // console.log(user_resp);
                this.calipsoService.login(username, 'umbrella');
                this.router.navigate(['/login']);
              },
              error => {
                if (error.status === 404) {
                  // console.log("User in UO not found or not linked..");
                  this.calipsoService.goExternalLoginWOU();
                }
              }
            );
          },
          error => {
            // console.log("No session found.. go to umbrella page");
            this.calipsoService.goExternalLoginUmbrella();
          }
        );
      });
    }
  }
  public getUserName(): string {
    return this.calipsoService.getLoggedUserName();
  }

  public isLogged(): boolean {
    return this.calipsoService.isLogged();
  }

  public logout() {
    // console.log("login_local:"+this.calipsoService.calipsoSettings.local_auth);
    if (this.calipsoService.getLoginType() === 'local') {
      this.calipsoService.unauth().subscribe(
        resp => {
          // console.log("logout done from UO");
          this.router.navigate(['/']);
        },
        error => {
          // console.log("Error in UO logout");
        }
      );
    } else {
      this.calipsoService.unauthUmbrella().subscribe(
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

  public login() {
    this.router.navigate(['/login']);
  }

  public getFrontendUrl() {
    return environment.frontend_calipso;
  }
}
