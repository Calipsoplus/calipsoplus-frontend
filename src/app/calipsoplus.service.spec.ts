import { TestBed, inject } from '@angular/core/testing';

import { CalipsoplusService } from './calipsoplus.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('CalipsoplusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalipsoplusService],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
  });

  it('should be created', inject([CalipsoplusService], (service: CalipsoplusService) => {
    expect(service).toBeTruthy();
  }));
});
