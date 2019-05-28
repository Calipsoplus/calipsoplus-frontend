import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { SelectCalipsoQuotaFormComponent } from '../select-calipso-quota-form/select-calipso-quota-form.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CalipsoplusService} from '../calipsoplus.service';
import {Location} from '@angular/common';
import {CalipsoUser} from '../calipso-user';
import {User} from '../user';
import {CalipsoQuota} from '../calipso-quota';

describe('SelectCalipsoQuotaFormComponent', () => {
  let component: SelectCalipsoQuotaFormComponent;
  let fixture: ComponentFixture<SelectCalipsoQuotaFormComponent>;

  let location: Location;
  let testUser: CalipsoUser;
  let testQuota: CalipsoQuota;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCalipsoQuotaFormComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCalipsoQuotaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    location = TestBed.get(Location);

    testUser = new CalipsoUser(1, new User('calipso', 'someDate', false));
    testQuota = new CalipsoQuota(5, 10, '10G', '30G');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should return quota', inject([CalipsoplusService],
  //   (calipsoplusService: CalipsoplusService) => {
  //     calipsoplusService.login('calipso1', 'local');
  //     const testUsedQuota = new CalipsoQuota(0, 0, '0G', '0G');
  //     spyOnProperty(component, 'quotas', 'get').and.returnValue(testQuota);
  //
  //     expect(component.setQuota).toHaveBeenCalledTimes(5);
  //     const usedQuotaSpy = spyOn(calipsoplusService, 'getCalipsoAvailableImageQuota').and.returnValue(testUsedQuota);
  //     component.ngOnInit();
  //
  //     expect(component.used_quota.cpu).toEqual(testUsedQuota.cpu);
  //     expect(component.quotas.max_simultaneous).toEqual(testQuota.max_simultaneous);
  //
  //   }));
});
