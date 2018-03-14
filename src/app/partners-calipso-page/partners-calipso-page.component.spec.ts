import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersCalipsoPageComponent } from './partners-calipso-page.component';

describe('PartnersCalipsoPageComponent', () => {
  let component: PartnersCalipsoPageComponent;
  let fixture: ComponentFixture<PartnersCalipsoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnersCalipsoPageComponent ]
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
});
