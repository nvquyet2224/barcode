import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelOrderUpdateComponent } from './parcel-order-update.component';

describe('ParcelOrderUpdateComponent', () => {
  let component: ParcelOrderUpdateComponent;
  let fixture: ComponentFixture<ParcelOrderUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParcelOrderUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelOrderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
