import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCalipsoUserFormComponent } from './login-calipso-user-form.component';

describe('LoginCalipsoUserFormComponent', () => {
  let component: LoginCalipsoUserFormComponent;
  let fixture: ComponentFixture<LoginCalipsoUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCalipsoUserFormComponent ]
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
