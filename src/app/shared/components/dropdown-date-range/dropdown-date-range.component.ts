import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CUSTOM_SORT,
  LAST_15_DAYS,
  LAST_MONTH_SORT,
  LAST_WEEK_SORT,
  MONTHLY_SORT,
  SEMESTER_SORT,
  WEEKLY_SORT,
  YEARLY_SORT,
} from '@core/utils/constants';

@Component({
  selector: 'app-dropdown-date-range',
  templateUrl: './dropdown-date-range.component.html',
})
export class DropdownDateRangeComponent {
  @Input() currentSelection: string = '';
  @Input() customRangeActive: boolean = false;
  @Output() selectionChange = new EventEmitter<string>();
  items: string[] = [];

  WEEKLY = WEEKLY_SORT;
  YEARLY = YEARLY_SORT;
  MONTHLY = MONTHLY_SORT;
  SEMESTER = SEMESTER_SORT;
  CUSTOM = CUSTOM_SORT;
  LAST_MONTH = LAST_MONTH_SORT;
  LAST_WEEK = LAST_WEEK_SORT;
  LAST_15_DAYS = LAST_15_DAYS;

  updateSelection(item: string): void {
    this.selectionChange.emit(item);
  }

  ngOnInit(): void {
    this.items = [
      this.WEEKLY,
      this.MONTHLY,
      this.SEMESTER,
      this.YEARLY,
      this.LAST_MONTH,
      this.LAST_WEEK,
      this.LAST_15_DAYS,
    ];
  }
}
