import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanActivateChild, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {CalipsoplusService} from '../calipsoplus.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private calipsoService: CalipsoplusService,
              private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.calipsoService.getLoggedUserName() != null) {
      // User authenticated sucessfully
      return true;
    }
    // User is not authenticated
    this._router.navigate(['/login']);
    return false;
  }

  /*
    Uses the canActivate method above to determine if user is authenticated for child roots
   */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

}
