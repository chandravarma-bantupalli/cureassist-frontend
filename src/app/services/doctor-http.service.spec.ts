import { TestBed } from '@angular/core/testing';

import { DoctorHttpService } from './doctor-http.service';

describe('DoctorHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctorHttpService = TestBed.get(DoctorHttpService);
    expect(service).toBeTruthy();
  });
});
