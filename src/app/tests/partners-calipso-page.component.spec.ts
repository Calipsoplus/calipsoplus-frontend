import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersCalipsoPageComponent } from '../partners-calipso-page/partners-calipso-page.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from '../app-routing.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {LoginCalipsoUserFormComponent} from '../login-calipso-user-form/login-calipso-user-form.component';
import {By} from '@angular/platform-browser';

describe('PartnersCalipsoPageComponent', () => {
  let component: PartnersCalipsoPageComponent;
  let fixture: ComponentFixture<PartnersCalipsoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnersCalipsoPageComponent],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersCalipsoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title "Partners involved" in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Partners involved');
  }));
});
