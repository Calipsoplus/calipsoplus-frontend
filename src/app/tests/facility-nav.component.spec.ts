import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Location} from '@angular/common';
import { FacilityNavComponent } from '../facility-nav/facility-nav.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

import {routes} from '../app-routing.module';

import {PartnersCalipsoPageComponent} from '../partners-calipso-page/partners-calipso-page.component';
import {AppRoutingModule} from '../app-routing.module';

describe('FacilityNavComponent', () => {
  let component: FacilityNavComponent;
  let fixture: ComponentFixture<FacilityNavComponent>;
  let location: Location;
  let router: Router


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityNavComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityNavComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
