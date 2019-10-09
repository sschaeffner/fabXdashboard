import { TestBed } from '@angular/core/testing';

import { QualificationService } from './qualification.service';

describe('QualificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QualificationService = TestBed.get(QualificationService);
    expect(service).toBeTruthy();
  });
});
