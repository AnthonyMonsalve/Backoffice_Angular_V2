import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AffiliateMasterClosure } from '@core/interfaces/affiliate-master-closures.interface';

@Component({
  selector: 'app-top-commerces',
  templateUrl: './top-commerces.component.html',
})
export class TopCommercesComponent implements OnInit {
  @Input() merchants!: AffiliateMasterClosure[];
  @Input() customRangeActive: boolean = false;
  @Input() defaultSort!: string;
  @Input() resetDefaultSort: boolean = false;
  @Input() formattedDateRange: string = '';
  @Output() sortByChange = new EventEmitter<string>();

  currentSortBy!: string;

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
