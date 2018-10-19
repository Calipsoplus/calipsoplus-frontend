import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCalipsoFavoriteFormComponent } from './select-calipso-favorite-form.component';

describe('SelectCalipsoFavoriteFormComponent', () => {
  let component: SelectCalipsoFavoriteFormComponent;
  let fixture: ComponentFixture<SelectCalipsoFavoriteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCalipsoFavoriteFormComponent ]
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
