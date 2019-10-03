import { TestBed } from '@angular/core/testing';

import { TestReportsService } from './test-reports.service';

describe('TestReportsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestReportsService = TestBed.get(TestReportsService);
    expect(service).toBeTruthy();
  });
});
