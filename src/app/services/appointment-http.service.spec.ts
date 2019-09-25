import { TestBed } from '@angular/core/testing';

import { AppointmentHttpService } from './appointment-http.service';

describe('AppointmentHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppointmentHttpService = TestBed.get(AppointmentHttpService);
    expect(service).toBeTruthy();
  });
});
