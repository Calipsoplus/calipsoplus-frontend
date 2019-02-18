import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalipsoVmComponent } from './calipso-vm.component';

describe('CalipsoVmComponent', () => {
  let component: CalipsoVmComponent;
  let fixture: ComponentFixture<CalipsoVmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalipsoVmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalipsoVmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
