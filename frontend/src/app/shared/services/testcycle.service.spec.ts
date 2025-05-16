import { TestBed } from '@angular/core/testing';

import { TestcycleService } from './testcycle.service';

describe('TestcycleService', () => {
  let service: TestcycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestcycleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
