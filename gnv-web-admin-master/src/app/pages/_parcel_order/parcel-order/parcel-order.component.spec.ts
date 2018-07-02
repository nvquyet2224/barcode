import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelOrderComponent } from './parcel-order.component';

describe('ParcelOrderComponent', () => {
  let component: ParcelOrderComponent;
  let fixture: ComponentFixture<ParcelOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParcelOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
