import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCalipsoFacilityFormComponent } from './select-calipso-facility-form.component';

describe('SelectCalipsoFacilityFormComponent', () => {
  let component: SelectCalipsoFacilityFormComponent;
  let fixture: ComponentFixture<SelectCalipsoFacilityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCalipsoFacilityFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCalipsoFacilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
