import { TestBed } from '@angular/core/testing';

import { HealthrecordsService } from './healthrecords.service';

describe('HealthrecordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthrecordsService = TestBed.get(HealthrecordsService);
    expect(service).toBeTruthy();
  });
});
