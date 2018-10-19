import { TestBed, inject } from '@angular/core/testing';

import { CalipsoplusService } from './calipsoplus.service';

describe('CalipsoplusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalipsoplusService]
    });
  });

  it('should be created', inject([CalipsoplusService], (service: CalipsoplusService) => {
    expect(service).toBeTruthy();
  }));
});
