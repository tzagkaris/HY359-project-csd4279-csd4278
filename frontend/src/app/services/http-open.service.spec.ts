import { TestBed } from '@angular/core/testing';

import { HttpOpenService } from './http-open.service';

describe('HttpOpenService', () => {
  let service: HttpOpenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpOpenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
