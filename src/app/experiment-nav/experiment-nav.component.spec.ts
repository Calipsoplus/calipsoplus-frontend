import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentNavComponent } from './experiment-nav.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('ExperimentNavComponent', () => {
  let component: ExperimentNavComponent;
  let fixture: ComponentFixture<ExperimentNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentNavComponent ],
      imports : [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
