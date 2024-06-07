import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryWebComponent } from './summary.component';

describe('SummaryWebComponent', () => {
  let component: SummaryWebComponent;
  let fixture: ComponentFixture<SummaryWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummaryWebComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
