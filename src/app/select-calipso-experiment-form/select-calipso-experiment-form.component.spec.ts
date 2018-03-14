import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCalipsoExperimentFormComponent } from './select-calipso-experiment-form.component';

describe('SelectCalipsoExperimentFormComponent', () => {
  let component: SelectCalipsoExperimentFormComponent;
  let fixture: ComponentFixture<SelectCalipsoExperimentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCalipsoExperimentFormComponent ]
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
