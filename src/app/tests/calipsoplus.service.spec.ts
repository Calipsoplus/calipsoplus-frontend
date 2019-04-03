import {TestBed, inject, async, tick, fakeAsync} from '@angular/core/testing';

import { CalipsoplusService } from '../calipsoplus.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CalipsoFacility} from '../calipso-facility';
import {CalipsoUser} from '../calipso-user';
import {User} from '../user';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/observable/of';
import {BaseRequestOptions, ConnectionBackend, RequestOptions, ResponseOptions, XHRBackend} from '@angular/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {Response} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {CalipsoQuota} from '../calipso-quota';
import {CalipsoImage} from '../calipso-image';
import {environment} from '../../environments/environment';

describe('CalipsoplusService', () => {

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let testUser: CalipsoUser;
  let testQuota: CalipsoQuota;
  const backendUrl_calipso = environment.backendUrl_calipso + environment.backendUrl_basehref;
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [CalipsoplusService,
        {provide: ConnectionBackend, useClass: MockBackend},
        {provide: RequestOptions, useClass: BaseRequestOptions}],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

    testUser = new CalipsoUser(1, new User('calipso', 'someDate', false));
    testQuota = new CalipsoQuota(5, 10, '10G', '30G');
  });

  afterEach(() => {
    // Remove session state
    sessionStorage.removeItem('ct');
    sessionStorage.removeItem('cb');
  });

  it('should be created', inject([CalipsoplusService], (calipsoplusService: CalipsoplusService) => {
    expect(calipsoplusService).toBeTruthy();
  }));

  it('Should return the logo url found in the constants', inject([CalipsoplusService],
    (calipsoplusService: CalipsoplusService) => {
      expect(calipsoplusService.getMyLogo()).toEqual(environment.facilityLogo);
    }));

  it('Should return the facilities in Calipsoplus', inject([CalipsoplusService],
    (calipsoplusService: CalipsoplusService) => {
      let facilities: CalipsoFacility[];
      calipsoplusService.getCalipsoFacilities().subscribe( resp => {
        tick();
        facilities = resp;
        expect(facilities.length).toEqual(1);
        expect(facilities[3]).toContain('asdfdsfsdfsdfsd');
      });
    }));

  it ('Should return a Calipso User' , inject([CalipsoplusService], (calipsoplusService: CalipsoplusService) => {

    let testUrl = calipsoplusService.userUrl;
    testUrl = testUrl.replace('$USERNAME', testUser.user.username);
    httpClient.get<CalipsoUser>(testUrl).subscribe(data => {
      expect(data).toEqual(testUser);
    });

    const req = httpTestingController.expectOne(backendUrl_calipso + 'user/calipso/');
    expect(req.request.method).toEqual('GET');
    req.flush(testUser);
    httpTestingController.verify();
  }));

  it ('Should return a Quota' , inject([CalipsoplusService], (calipsoplusService: CalipsoplusService) => {

    let testUrl = calipsoplusService.quotaUrl;
    testUrl = testUrl.replace('$USERNAME', testUser.user.username);
    httpClient.get<CalipsoQuota>(testUrl).subscribe(data => {
      expect(data).toEqual(testQuota);
    });

    const req = httpTestingController.expectOne(backendUrl_calipso + 'quota/calipso/');
    expect(req.request.method).toEqual('GET');
    req.flush(testQuota);
    httpTestingController.verify();
  }));

  it ('Should return a the used Quota for a user / available image quota' , inject([CalipsoplusService],
    (calipsoplusService: CalipsoplusService) => {
      let testUrl = calipsoplusService.usedQuotaUrl;
      testUrl = testUrl.replace('$USERNAME', testUser.user.username);
      httpClient.get<CalipsoQuota>(testUrl).subscribe(data => {
        expect(data).toEqual(testQuota);
      });

      const req = httpTestingController.expectOne(backendUrl_calipso + 'used_quota/calipso/');
      expect(req.request.method).toEqual('GET');
      req.flush(testQuota);
      httpTestingController.verify();
    }));

  it ('Should return an image using a given public name' , inject([CalipsoplusService],
    (calipsoplusService: CalipsoplusService) => {
      const testImage = {
        'public_name': 'base_jupyter',
        'image': 'jupyter/scipy-notebook',
        'protocol': 'vnc',
        'cpu': 1,
        'memory': '3G',
        'hdd': '5G',
        'resource_type': 1,
      };

      let testUrl = calipsoplusService.imageUrl;
      testUrl = testUrl.replace('$PUBLIC_NAME', testImage.public_name);


      httpClient.get<CalipsoImage>(testUrl).subscribe(data => {
        // @ts-ignore
        expect(data).toEqual(testImage);
      });

      const req = httpTestingController.expectOne(backendUrl_calipso + 'image/base_jupyter/');
      expect(req.request.method).toEqual('GET');
      req.flush(testImage);
      httpTestingController.verify();
    }));

  it ('Should add a new image' , inject([CalipsoplusService],
    (calipsoplusService: CalipsoplusService) => {
      const testImage = {
        'public_name': 'base_jupyter',
        'image': 'jupyter/scipy-notebook',
        'protocol': 'vnc',
        'cpu': 1,
        'memory': '3G',
        'hdd': '5G',
        'resource_type': 1,
      };
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': 'none'
      });

      let testUrl = calipsoplusService.imageUrl;
      testUrl = testUrl.replace('$PUBLIC_NAME', testImage.public_name);


      httpClient.post(testUrl, testImage, {headers: headers, withCredentials: true}).subscribe(data => {
        // @ts-ignore
        expect(data).toEqual(testImage);
      });

      const req = httpTestingController.expectOne(backendUrl_calipso + 'image/base_jupyter/');
      expect(req.request.method).toEqual('POST');
      req.flush(testImage);
      httpTestingController.verify();
    }));


  it ('Should return all available images' , inject([CalipsoplusService], (calipsoplusService: CalipsoplusService) => {

    const testImages = [
      {
        'public_name': 'base_image',
        'image': 'consol/centos-xfce-vnc:latest',
        'protocol': 'vnc',
        'cpu': 1,
        'memory': '3G',
        'hdd': '5G',
        'resource_type': 1
      },
      {
        'public_name': 'base_jupyter',
        'image': 'jupyter/scipy-notebook',
        'protocol': 'vnc',
        'cpu': 1,
        'memory': '3G',
        'hdd': '5G',
        'resource_type': 1
      },
      {
        'public_name': 'base_image_ubuntu',
        'image': 'danielguerra/ubuntu-xrdp',
        'protocol': 'rdp',
        'cpu': 1,
        'memory': '3G',
        'hdd': '5G',
        'resource_type': 1
      }
    ];
    const testUrl = calipsoplusService.imageListUrl;
    httpClient.get<CalipsoImage[]>(testUrl).subscribe(data => {
      // @ts-ignore
      expect(data).toEqual(testImages);
      expect(data.length).toEqual(3);
    });

    const req = httpTestingController.expectOne(backendUrl_calipso + 'images/');
    expect(req.request.method).toEqual('GET');
    req.flush(testImages);
    httpTestingController.verify();
  }));

  it ('Should login() set ct and cb in session storage' , inject([CalipsoplusService], (calipsoplusService: CalipsoplusService) => {
    expect(sessionStorage.getItem('ct')).toBeNull();
    expect(sessionStorage.getItem('cb')).toBeNull();
    calipsoplusService.login(testUser.user.username, '1');

    expect(sessionStorage.getItem('ct')).toEqual(testUser.user.username);
    expect(sessionStorage.getItem('cb')).toEqual('1');
    calipsoplusService.removeStorage();

  }));

  it ('Should return the login type' , inject([CalipsoplusService], (calipsoplusService: CalipsoplusService) => {
    sessionStorage.setItem('cb', '1');
    expect(calipsoplusService.getLoginType()).toEqual('1');
    sessionStorage.setItem('cb', '0');
    expect(calipsoplusService.getLoginType()).toEqual('0');
  }));

  it ('Should return if user is logged in or not' , inject([CalipsoplusService], (calipsoplusService: CalipsoplusService) => {
    expect(calipsoplusService.isLogged()).toEqual(false);
    sessionStorage.setItem('ct', testUser.user.username);
    expect(calipsoplusService.isLogged()).toEqual(true);
  }));

  it ('Should remove ct and cb from local storage' , inject([CalipsoplusService], (calipsoplusService: CalipsoplusService) => {
    sessionStorage.setItem('ct', testUser.user.username);
    // Assuming 1 = local authentication
    sessionStorage.setItem('cb', '1');

    expect(sessionStorage.getItem('ct')).toEqual(testUser.user.username);
    expect(sessionStorage.getItem('cb')).toEqual('1');
    calipsoplusService.removeStorage();
    expect(sessionStorage.getItem('ct')).toBeNull();
    expect(sessionStorage.getItem('cb')).toBeNull();
  }));

  it ('Should format date correctly' , inject([CalipsoplusService], (calipsoplusService: CalipsoplusService) => {
    let date = new Date(2018, 1, 12, 14, 10, 12, 5); // Month starts from 0
    expect(calipsoplusService.formatDate(date)).toEqual('12/2/2018 14:10');
    date = new Date(2019, 0, 1, 14, 10);
    expect(calipsoplusService.formatDate(date)).toEqual('1/1/2019 14:10');
    date = new Date(2019, -1, 1, 14, 10);
    expect(calipsoplusService.formatDate(date)).toEqual('1/12/2018 14:10');

  }));
});
