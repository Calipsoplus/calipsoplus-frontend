import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCalipsoOwnResourcesFormComponent } from './select-calipso-own-resources-form.component';

describe('SelectCalipsoOwnResourcesFormComponent', () => {
  let component: SelectCalipsoOwnResourcesFormComponent;
  let fixture: ComponentFixture<SelectCalipsoOwnResourcesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCalipsoOwnResourcesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCalipsoOwnResourcesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
