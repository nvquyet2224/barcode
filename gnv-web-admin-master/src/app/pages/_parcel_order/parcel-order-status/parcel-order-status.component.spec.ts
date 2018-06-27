import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelOrderStatusComponent } from './parcel-order-status.component';

describe('ParcelOrderStatusComponent', () => {
  let component: ParcelOrderStatusComponent;
  let fixture: ComponentFixture<ParcelOrderStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParcelOrderStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
