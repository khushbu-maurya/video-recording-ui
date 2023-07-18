import { TestBed } from '@angular/core/testing';

import { GeneratelinkService } from './generatelink.service';

describe('GeneratelinkService', () => {
  let service: GeneratelinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneratelinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
