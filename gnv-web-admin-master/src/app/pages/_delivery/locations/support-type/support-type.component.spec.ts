import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTypeComponent } from './support-type.component';

describe('SupportTypeComponent', () => {
  let component: SupportTypeComponent;
  let fixture: ComponentFixture<SupportTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
