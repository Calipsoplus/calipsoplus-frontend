import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCalipsoQuotaFormComponent } from './select-calipso-quota-form.component';

describe('SelectCalipsoQuotaFormComponent', () => {
  let component: SelectCalipsoQuotaFormComponent;
  let fixture: ComponentFixture<SelectCalipsoQuotaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCalipsoQuotaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCalipsoQuotaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
