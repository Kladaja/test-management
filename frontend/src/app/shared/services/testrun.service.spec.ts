import { TestBed } from '@angular/core/testing';

import { TestrunService } from './testrun.service';

describe('TestrunService', () => {
  let service: TestrunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestrunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
