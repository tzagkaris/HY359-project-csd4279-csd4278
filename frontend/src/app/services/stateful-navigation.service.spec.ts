import { TestBed } from '@angular/core/testing';

import { StatefulNavigationService } from './stateful-navigation.service';

describe('StatefulNavigationService', () => {
  let service: StatefulNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatefulNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
