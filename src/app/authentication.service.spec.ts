import {inject, TestBed} from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {CalipsoUser} from './calipso-user';
import {User} from './user';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

let testUser: CalipsoUser;

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    testUser = new CalipsoUser(1, new User('calipso', 'someDate', false));
  });

  it('should be created', inject([AuthenticationService], (authService: AuthenticationService) => {
    expect(authService).toBeTruthy();
  }));

  it ('Should login() set ct and cb in session storage' , inject([AuthenticationService], (authService: AuthenticationService) => {
    expect(sessionStorage.getItem('ct')).toBeNull();
    expect(sessionStorage.getItem('cb')).toBeNull();
    authService.login(testUser.user.username, '1');

    expect(sessionStorage.getItem('ct')).toEqual(testUser.user.username);
    expect(sessionStorage.getItem('cb')).toEqual('1');
    authService.removeStorage();

  }));

  it ('Should return the login type' , inject([AuthenticationService], (authService: AuthenticationService) => {
    sessionStorage.setItem('cb', '1');
    expect(authService.getLoginType()).toEqual('1');
    sessionStorage.setItem('cb', '0');
    expect(authService.getLoginType()).toEqual('0');
  }));

  it ('Should return if user is logged in or not' , inject([AuthenticationService], (authService: AuthenticationService)  => {
    expect(authService.isLogged()).toEqual(false);
    sessionStorage.setItem('ct', testUser.user.username);
    expect(authService.isLogged()).toEqual(true);
  }));

  it ('Should remove ct and cb from local storage' , inject([AuthenticationService], (authService: AuthenticationService)  => {
    sessionStorage.setItem('ct', testUser.user.username);
    // Assuming 1 = local authentication
    sessionStorage.setItem('cb', '1');

    expect(sessionStorage.getItem('ct')).toEqual(testUser.user.username);
    expect(sessionStorage.getItem('cb')).toEqual('1');
    authService.removeStorage();
    expect(sessionStorage.getItem('ct')).toBeNull();
    expect(sessionStorage.getItem('cb')).toBeNull();
  }));
});
