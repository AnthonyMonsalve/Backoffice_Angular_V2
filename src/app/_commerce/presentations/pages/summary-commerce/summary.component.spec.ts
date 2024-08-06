import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCommerceComponent } from './summary.component';

describe('SummaryCommerceComponent', () => {
  let component: SummaryCommerceComponent;
  let fixture: ComponentFixture<SummaryCommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummaryCommerceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryCommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
