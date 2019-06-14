import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CalipsoplusService} from '../calipsoplus.service';
import {AuthenticationService} from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {

  isAdmin = false;

  constructor(
    private authService: AuthenticationService,
    private calipsoService: CalipsoplusService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
    | boolean | UrlTree {

    return this.checkAdmin();
  }

  checkAdmin() {
    this.authService.isAdmin().then(res => {
      this.isAdmin = res;
    });

    // User is not an admin
    if (!this.isAdmin) {
      // Navigate to a different page
      this.router.navigate(['/navigation']);
      return false;
    }
    // User is an admin
    // Allow access
    return true;
  }

  /*
  Uses the canActivate method above to determine if user is authenticated for child roots
  */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
