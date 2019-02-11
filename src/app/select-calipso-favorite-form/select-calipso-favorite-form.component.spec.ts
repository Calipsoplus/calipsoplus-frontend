import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCalipsoFavoriteFormComponent } from './select-calipso-favorite-form.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('SelectCalipsoFavoriteFormComponent', () => {
  let component: SelectCalipsoFavoriteFormComponent;
  let fixture: ComponentFixture<SelectCalipsoFavoriteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCalipsoFavoriteFormComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCalipsoFavoriteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
