import { TestBed, inject } from '@angular/core/testing';

import { AreaTypeService } from './area-type.service';

describe('AreaTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaTypeService]
    });
  });

  it('should be created', inject([AreaTypeService], (service: AreaTypeService) => {
    expect(service).toBeTruthy();
  }));
});
