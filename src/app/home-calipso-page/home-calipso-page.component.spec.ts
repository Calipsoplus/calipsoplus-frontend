import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCalipsoPageComponent } from './home-calipso-page.component';

describe('HomeCalipsoPageComponent', () => {
  let component: HomeCalipsoPageComponent;
  let fixture: ComponentFixture<HomeCalipsoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCalipsoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCalipsoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
