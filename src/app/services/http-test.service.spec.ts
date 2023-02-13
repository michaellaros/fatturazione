import { TestBed } from '@angular/core/testing';

import { HttpTestService } from './http-test.service';

describe('HttpTestService', () => {
  let service: HttpTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
