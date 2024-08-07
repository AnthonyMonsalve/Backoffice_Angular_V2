import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AffiliateClosure } from '@core/interfaces/affiliate-closures.interface';

@Component({
  selector: 'app-top-affiliates-from-commerce',
  templateUrl: './top-affiliates-from-commerce.component.html',
})
export class TopAffiliatesFromCommerceComponent implements OnInit {
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() sortByChange = new EventEmitter<string>();

  @Input() affiliates!: AffiliateClosure[];
  @Input() customRangeActive: boolean = false;
  @Input() page: number = 0;
  @Input() limit: number = 0;
  @Input() total: number = 0;
  @Input() defaultSort!: string;
  @Input() resetDefaultSort: boolean = false;
  @Input() formattedDateRange: string = '';
  @Input() isLoading: boolean = true;

  currentSortBy!: string;
  showLoad: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.currentSortBy = this.defaultSort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.resetDefaultSort) {
      this.currentSortBy = this.defaultSort;
    }

    if (changes['isLoading']) {
      this.showLoad = true;
      if (!this.isLoading) {
        this.showLoad = false;
      }
    }
  }

  onPageChange(newPage: number): void {
    this.pageChange.emit(newPage);
  }

  updateSortBy(period: string): void {
    this.currentSortBy = period.charAt(0).toUpperCase() + period.slice(1);
    this.sortByChange.emit(this.currentSortBy);
  }
}
