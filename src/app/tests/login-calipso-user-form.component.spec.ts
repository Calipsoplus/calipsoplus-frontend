import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCalipsoUserFormComponent } from '../login-calipso-user-form/login-calipso-user-form.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoginCalipsoUserFormComponent', () => {
  let component: LoginCalipsoUserFormComponent;
  let fixture: ComponentFixture<LoginCalipsoUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCalipsoUserFormComponent ],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      schemas: [ NO_ERRORS_SCHEMA ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCalipsoUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
