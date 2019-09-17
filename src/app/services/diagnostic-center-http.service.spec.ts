import { TestBed } from '@angular/core/testing';

import { DiagnosticCenterHttpService } from './diagnostic-center-http.service';

describe('DiagnosticCenterHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiagnosticCenterHttpService = TestBed.get(DiagnosticCenterHttpService);
    expect(service).toBeTruthy();
  });
});
