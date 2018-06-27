import { TestBed, inject } from '@angular/core/testing';

import { WarehouseAreaService } from './warehouse-area.service';

describe('WarehouseAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarehouseAreaService]
    });
  });

  it('should be created', inject([WarehouseAreaService], (service: WarehouseAreaService) => {
    expect(service).toBeTruthy();
  }));
});
