import { TestBed } from '@angular/core/testing';

import { CvRemoteService } from './cv-remote.service';

describe('CvRemoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CvRemoteService = TestBed.get(CvRemoteService);
    expect(service).toBeTruthy();
  });
});
