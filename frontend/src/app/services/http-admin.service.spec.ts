import { TestBed } from '@angular/core/testing';

import { HttpAdminService } from './http-admin.service';

describe('HttpAdminService', () => {
  let service: HttpAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
