import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Basic404Component } from './basic404.component';

describe('Basic404Component', () => {
  let component: Basic404Component;
  let fixture: ComponentFixture<Basic404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Basic404Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Basic404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
