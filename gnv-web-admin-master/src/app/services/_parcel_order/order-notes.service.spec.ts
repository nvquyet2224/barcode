import { TestBed, inject } from '@angular/core/testing';

import { OrderNotesService } from './order-notes.service';

describe('OrderNotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderNotesService]
    });
  });

  it('should be created', inject([OrderNotesService], (service: OrderNotesService) => {
    expect(service).toBeTruthy();
  }));
});
