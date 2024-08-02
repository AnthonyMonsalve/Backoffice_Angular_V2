import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AffiliateClosure } from '@core/interfaces/affiliate-closures.interface';
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
  selector: 'app-top-affiliates-from-commerce',
  templateUrl: './top-affiliates-from-commerce.component.html',
})
export class TopAffiliatesFromCommerceComponent implements OnInit {
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() affiliates!: AffiliateClosure[];
  @Input() customRangeActive: boolean = false;
  @Input() page: number = 0;
  @Input() limit: number = 0;
  @Input() total: number = 0;

  @Output() sortByChange = new EventEmitter<string>();

  currentSortBy: string = MONTHLY_SORT;

  WEEKLY = WEEKLY_SORT;
  YEARLY = YEARLY_SORT;
  MONTHLY = MONTHLY_SORT;
  SEMESTER = SEMESTER_SORT;
  CUSTOM = CUSTOM_SORT;
  LAST_MONTH = LAST_MONTH_SORT;

  constructor() {}

  ngOnInit(): void {}

  onPageChange(newPage: number): void {
    this.pageChange.emit(newPage);
  }

  updateSortBy(period: string): void {
    this.currentSortBy = period.charAt(0).toUpperCase() + period.slice(1);
    this.sortByChange.emit(this.currentSortBy);
  }
}
