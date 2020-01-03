import { TestBed } from '@angular/core/testing';

import { JDMService } from './jdm.service';

describe('JDMService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JDMService = TestBed.get(JDMService);
    expect(service).toBeTruthy();
  });
});
