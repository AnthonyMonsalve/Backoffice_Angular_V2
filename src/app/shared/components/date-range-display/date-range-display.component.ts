import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-range-display',
  templateUrl: './date-range-display.component.html',
})
export class DateRangeDisplayComponent implements OnInit {
  @Input() stringDateRange!: string;

  constructor() {}

  ngOnInit(): void {}
}
