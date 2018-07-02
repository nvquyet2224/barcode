import { TestBed, inject } from '@angular/core/testing';

import { MultiPhotoService } from './multi-photo.service';

describe('MultiPhotoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultiPhotoService]
    });
  });

  it('should be created', inject([MultiPhotoService], (service: MultiPhotoService) => {
    expect(service).toBeTruthy();
  }));
});
