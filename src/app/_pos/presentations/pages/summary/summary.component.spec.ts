import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPosComponent } from './summary.component';

describe('SummaryPosComponent', () => {
  let component: SummaryPosComponent;
  let fixture: ComponentFixture<SummaryPosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummaryPosComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
