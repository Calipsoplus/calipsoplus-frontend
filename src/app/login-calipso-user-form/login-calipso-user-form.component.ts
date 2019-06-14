import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalipsoplusService } from '../calipsoplus.service';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login-calipso-user-form',
  templateUrl: './login-calipso-user-form.component.html',
  styleUrls: ['./login-calipso-user-form.component.css']
})
export class LoginCalipsoUserFormComponent implements OnInit {
  username: string;
  password: string;
  showme: boolean;

  public toggle_ShowMeLocalLogin() {
    this.showme = !this.showme;
  }

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    public calipsoService: CalipsoplusService
  ) {}

  login_UO() {
    this.authService.unauth().subscribe(
      resp => {
        this.authService.auth(this.username, this.password).subscribe(
          response => {
              this.router.navigate(['/navigation']);
          },
          error => {
            alert('Invalid credentials');
          }
        );
      },
      error => {
        console.log('Error in logout');
      }
    );
  }

  public isSettingsLocalLogin() {
    return this.calipsoService.defaultCalipsoSettings.local_auth;
  }

  public login_umbrella() {
    this.authService.goExternalLoginUmbrella();
  }

  public login_openid() {
    this.authService.goOpenIdConnect();
  }

  ngOnInit() {
    if (this.authService.isLogged()) {
      this.router.navigate(['/navigation']);
    }
  }
}
