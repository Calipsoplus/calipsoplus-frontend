import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalipsoContainerImagesComponent } from '../admin/calipso-container-images/calipso-container-images.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('CalipsoContainerImagesComponent', () => {
  let component: CalipsoContainerImagesComponent;
  let fixture: ComponentFixture<CalipsoContainerImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalipsoContainerImagesComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalipsoContainerImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
