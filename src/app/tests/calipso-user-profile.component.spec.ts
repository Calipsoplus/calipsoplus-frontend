import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalipsoUserProfileComponent } from '../admin/calipso-user-profile/calipso-user-profile.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('CalipsoUserProfileComponent', () => {
  let component: CalipsoUserProfileComponent;
  let fixture: ComponentFixture<CalipsoUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalipsoUserProfileComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalipsoUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
