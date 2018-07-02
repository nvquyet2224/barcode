import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinceCreateComponent } from './province-create.component';

describe('ProvinceCreateComponent', () => {
  let component: ProvinceCreateComponent;
  let fixture: ComponentFixture<ProvinceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvinceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvinceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
