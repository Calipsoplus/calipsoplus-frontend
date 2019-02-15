import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalipsoplusService } from '../calipsoplus.service';

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
    public calipsoService: CalipsoplusService
  ) {}

  login_UO() {
    this.calipsoService.unauth().subscribe(
      resp => {
        this.calipsoService.auth(this.username, this.password).subscribe(
          response => {
              this.router.navigate(['/experiment']);
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
    this.calipsoService.goExternalLoginUmbrella();
  }

  ngOnInit() {
    if (this.calipsoService.isLogged()) {
      this.router.navigate(['/experiment']);
    }
  }
}
