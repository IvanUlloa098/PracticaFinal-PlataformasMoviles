import { TestBed } from '@angular/core/testing';

import { GuardpasarGuard } from './guardpasar.guard';

describe('GuardpasarGuard', () => {
  let guard: GuardpasarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardpasarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
