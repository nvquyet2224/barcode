import { TestBed, inject } from '@angular/core/testing';

import { WarehouseDetailService } from './warehouse-detail.service';

describe('WarehouseDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarehouseDetailService]
    });
  });

  it('should be created', inject([WarehouseDetailService], (service: WarehouseDetailService) => {
    expect(service).toBeTruthy();
  }));
});
