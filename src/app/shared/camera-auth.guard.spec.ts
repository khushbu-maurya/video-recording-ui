import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cameraAuthGuard } from './camera-auth.guard';

describe('cameraAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cameraAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
