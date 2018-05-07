import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCalipsoResourceFormComponent } from './select-calipso-resource-form.component';

describe('SelectCalipsoResourceFormComponent', () => {
  let component: SelectCalipsoResourceFormComponent;
  let fixture: ComponentFixture<SelectCalipsoResourceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCalipsoResourceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCalipsoResourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
