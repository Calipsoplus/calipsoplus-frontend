import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityNavComponent } from '../facility-nav/facility-nav.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('FacilityNavComponent', () => {
  let component: FacilityNavComponent;
  let fixture: ComponentFixture<FacilityNavComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
