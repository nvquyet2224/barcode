import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseDetailUpdateComponent } from './warehouse-detail-update.component';

describe('WarehouseDetailUpdateComponent', () => {
  let component: WarehouseDetailUpdateComponent;
  let fixture: ComponentFixture<WarehouseDetailUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseDetailUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseDetailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
