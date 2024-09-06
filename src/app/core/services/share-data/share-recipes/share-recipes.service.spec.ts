import { TestBed } from '@angular/core/testing';

import { ShareRecipesService } from './share-recipes.service';

describe('ShareRecipesService', () => {
  let service: ShareRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
