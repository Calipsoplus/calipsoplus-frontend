import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalipsoVmImagesComponent } from './calipso-vm-images.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('CalipsoVmImagesComponent', () => {
  let component: CalipsoVmImagesComponent;
  let fixture: ComponentFixture<CalipsoVmImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalipsoVmImagesComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalipsoVmImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
