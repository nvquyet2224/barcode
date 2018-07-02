import { TestBed, inject } from '@angular/core/testing';

import { ParcelOrderStatusService } from './parcel-order-status.service';

describe('ParcelOrderStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParcelOrderStatusService]
    });
  });

  it('should be created', inject([ParcelOrderStatusService], (service: ParcelOrderStatusService) => {
    expect(service).toBeTruthy();
  }));
});
