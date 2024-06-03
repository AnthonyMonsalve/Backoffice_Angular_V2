import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalActivityComponent } from './terminal-activity.component';

describe('TerminalActivityComponent', () => {
  let component: TerminalActivityComponent;
  let fixture: ComponentFixture<TerminalActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminalActivityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
