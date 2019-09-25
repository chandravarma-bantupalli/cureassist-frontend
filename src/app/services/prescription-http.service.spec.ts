import { TestBed } from '@angular/core/testing';

import { PrescriptionHttpService } from './prescription-http.service';

describe('PrescriptionHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrescriptionHttpService = TestBed.get(PrescriptionHttpService);
    expect(service).toBeTruthy();
  });
});
