import { TestBed, inject } from '@angular/core/testing';

import { FormdataUploadService } from './formdata-upload.service';

describe('FormdataUploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormdataUploadService]
    });
  });

  it('should be created', inject([FormdataUploadService], (service: FormdataUploadService) => {
    expect(service).toBeTruthy();
  }));
});
