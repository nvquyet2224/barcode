import { TestBed, inject } from '@angular/core/testing';

import { SupportTypeService } from './support-type.service';

describe('SupportTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupportTypeService]
    });
  });

  it('should be created', inject([SupportTypeService], (service: SupportTypeService) => {
    expect(service).toBeTruthy();
  }));
});
