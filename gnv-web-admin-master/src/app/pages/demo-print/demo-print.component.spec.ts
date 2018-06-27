import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoPrintComponent } from './demo-print.component';

describe('DemoPrintComponent', () => {
  let component: DemoPrintComponent;
  let fixture: ComponentFixture<DemoPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
