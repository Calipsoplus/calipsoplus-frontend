import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCalipsoExperimentFormComponent } from './select-calipso-experiment-form.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('SelectCalipsoExperimentFormComponent', () => {
  let component: SelectCalipsoExperimentFormComponent;
  let fixture: ComponentFixture<SelectCalipsoExperimentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCalipsoExperimentFormComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCalipsoExperimentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
