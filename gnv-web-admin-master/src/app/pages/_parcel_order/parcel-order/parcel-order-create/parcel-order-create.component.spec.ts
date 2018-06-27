import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelOrderCreateComponent } from './parcel-order-create.component';

describe('ParcelOrderCreateComponent', () => {
  let component: ParcelOrderCreateComponent;
  let fixture: ComponentFixture<ParcelOrderCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParcelOrderCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelOrderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
