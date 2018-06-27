import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseDetailCreateComponent } from './warehouse-detail-create.component';

describe('WarehouseDetailCreateComponent', () => {
  let component: WarehouseDetailCreateComponent;
  let fixture: ComponentFixture<WarehouseDetailCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseDetailCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseDetailCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
