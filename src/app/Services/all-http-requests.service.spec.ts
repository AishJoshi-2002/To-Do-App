import { TestBed } from '@angular/core/testing';

import { AllHttpRequestsService } from './all-http-requests.service';

describe('AllHttpRequestsService', () => {
  let service: AllHttpRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllHttpRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
