import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaTypeUpdateComponent } from './area-type-update.component';

describe('AreaTypeUpdateComponent', () => {
  let component: AreaTypeUpdateComponent;
  let fixture: ComponentFixture<AreaTypeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaTypeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
