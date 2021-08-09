import { TestBed } from '@angular/core/testing';

import { GuardnopasarGuard } from './guardnopasar.guard';

describe('GuardnopasarGuard', () => {
  let guard: GuardnopasarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardnopasarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
