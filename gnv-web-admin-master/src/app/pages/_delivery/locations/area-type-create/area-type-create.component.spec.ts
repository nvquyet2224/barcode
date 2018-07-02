import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaTypeCreateComponent } from './area-type-create.component';

describe('AreaTypeCreateComponent', () => {
  let component: AreaTypeCreateComponent;
  let fixture: ComponentFixture<AreaTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
