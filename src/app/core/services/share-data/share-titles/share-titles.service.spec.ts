import { TestBed } from '@angular/core/testing';

import { ShareTitlesService } from './share-titles.service';

describe('ShareTitlesService', () => {
  let service: ShareTitlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareTitlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
