import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCalipsoPageComponent } from './about-calipso-page.component';

describe('AboutCalipsoPageComponent', () => {
  let component: AboutCalipsoPageComponent;
  let fixture: ComponentFixture<AboutCalipsoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutCalipsoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCalipsoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
