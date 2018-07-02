import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiPhotoComponent } from './multi-photo.component';

describe('MultiPhotoComponent', () => {
  let component: MultiPhotoComponent;
  let fixture: ComponentFixture<MultiPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
