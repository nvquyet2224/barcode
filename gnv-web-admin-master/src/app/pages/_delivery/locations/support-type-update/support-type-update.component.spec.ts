import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTypeUpdateComponent } from './support-type-update.component';

describe('SupportTypeUpdateComponent', () => {
  let component: SupportTypeUpdateComponent;
  let fixture: ComponentFixture<SupportTypeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportTypeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
