import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import {CalipsoplusService} from './calipsoplus.service';
import {Injectable} from '@angular/core';
import {CalipsoUser} from './calipso-user';

@Injectable()
export class AuthGuard implements CanActivate {
  username: string;
  calipsoUser: CalipsoUser;

  constructor(private calipsoService: CalipsoplusService
    , private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.username = this.calipsoService.getLoggedUserName();
    return this.calipsoService.getCalipsoUser(this.username)
      .map(res => {
        this.calipsoUser = res;
        if (this.calipsoUser.user.is_superuser) {
          // Allow user to continue to admin page
          return true;
        }
        // navigate to experiment
        this._router.navigate(['experiment']);
        // you can save redirect url so after authing we can move them back to the page they requested
        return false;
      });
  }
}
