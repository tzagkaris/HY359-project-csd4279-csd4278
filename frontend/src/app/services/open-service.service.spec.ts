import { TestBed } from '@angular/core/testing';

import { OpenServiceService } from './open-service.service';

describe('OpenServiceService', () => {
  let service: OpenServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
