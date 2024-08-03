import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AffiliateMasterClosure } from '@core/interfaces/affiliate-master-closures.interface';
import {
  CUSTOM_SORT,
  LAST_MONTH_SORT,
  MONTHLY_SORT,
  SEMESTER_SORT,
  WEEKLY_SORT,
  YEARLY_SORT,
} from '@core/utils/constants';

@Component({
  selector: 'app-top-commerces',
  templateUrl: './top-commerces.component.html',
})
export class TopCommercesComponent implements OnInit {
  @Input() merchants!: AffiliateMasterClosure[];
  @Input() customRangeActive: boolean = false;
  @Input() defaultSort!: string;
  @Input() resetDefaultSort: boolean = false;
  @Output() sortByChange = new EventEmitter<string>();

  currentSortBy!: string;

  WEEKLY = WEEKLY_SORT;
  YEARLY = YEARLY_SORT;
  MONTHLY = MONTHLY_SORT;
  SEMESTER = SEMESTER_SORT;
  CUSTOM = CUSTOM_SORT;
  LAST_MONTH = LAST_MONTH_SORT;

  constructor() {}

  ngOnInit(): void {
    this.currentSortBy = this.defaultSort;
  }

  ngOnChanges(): void {
    if (this.resetDefaultSort) {
      this.currentSortBy = this.defaultSort;
    }
  }

  updateSortBy(period: string): void {
    this.currentSortBy = period.charAt(0).toUpperCase() + period.slice(1);
    this.sortByChange.emit(this.currentSortBy);
  }
}
