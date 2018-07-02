import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTypeCreateComponent } from './support-type-create.component';

describe('SupportTypeCreateComponent', () => {
  let component: SupportTypeCreateComponent;
  let fixture: ComponentFixture<SupportTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
