import { TestBed } from '@angular/core/testing';

import { AdminGuard } from './admin-guard.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {CalipsoplusService} from '../calipsoplus.service';

describe('AdminGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [CalipsoplusService],
    schemas: [NO_ERRORS_SCHEMA]
  }));

  it('should be created', () => {
    const service: AdminGuard = TestBed.get(AdminGuard);
    expect(service).toBeTruthy();
  });
});
