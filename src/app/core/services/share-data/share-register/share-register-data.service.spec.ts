import { TestBed } from '@angular/core/testing';

import { ShareRegisterDataService } from './share-register-data.service';

describe('ShareRegistrationDataService', () => {
  let service: ShareRegisterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareRegisterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
