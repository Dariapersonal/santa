import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ByakaComponent } from './byaka.component';

describe('ByakaComponent', () => {
  let component: ByakaComponent;
  let fixture: ComponentFixture<ByakaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ByakaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ByakaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
