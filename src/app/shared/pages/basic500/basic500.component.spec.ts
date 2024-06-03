import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Basic500Component } from './basic500.component';

describe('Basic500Component', () => {
  let component: Basic500Component;
  let fixture: ComponentFixture<Basic500Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Basic500Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Basic500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
