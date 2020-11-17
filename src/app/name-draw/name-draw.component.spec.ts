import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameDrawComponent } from './name-draw.component';

describe('NameDrawComponent', () => {
  let component: NameDrawComponent;
  let fixture: ComponentFixture<NameDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
