import { TestBed, async, inject } from '@angular/core/testing';

import { AccessCodeGuard } from './access-code.guard';

describe('AccessCodeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessCodeGuard]
    });
  });

  it('should ...', inject([AccessCodeGuard], (guard: AccessCodeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
