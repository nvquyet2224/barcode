import { TestBed, inject } from '@angular/core/testing';

import { ParcelOrderService } from './parcel-order.service';

describe('ParcelOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParcelOrderService]
    });
  });

  it('should be created', inject([ParcelOrderService], (service: ParcelOrderService) => {
    expect(service).toBeTruthy();
  }));
});
