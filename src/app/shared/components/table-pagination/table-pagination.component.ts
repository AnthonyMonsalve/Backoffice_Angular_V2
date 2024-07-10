import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss'],
})
export class TablePaginationComponent implements OnChanges {
  @Input() total: number = 0;
  @Input() page: number = 1;
  @Input() limit: number = 10;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: number[] = [];

  ngOnChanges(): void {
    this.generatePages();
  }

  generatePages(): void {
    this.pages = [];
    const totalPages = Math.ceil(this.total / this.limit);

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        this.pages.push(i);
      }
    } else {
      if (this.page <= 4) {
        for (let i = 1; i <= 5; i++) {
          this.pages.push(i);
        }
        this.pages.push(-1);
        this.pages.push(totalPages);
      } else if (this.page > 4 && this.page < totalPages - 3) {
        this.pages.push(1);
        this.pages.push(-1);
        for (let i = this.page - 1; i <= this.page + 1; i++) {
          this.pages.push(i);
        }
        this.pages.push(-1);
        this.pages.push(totalPages);
      } else {
        this.pages.push(1);
        this.pages.push(-1);
        for (let i = totalPages - 4; i <= totalPages; i++) {
          this.pages.push(i);
        }
      }
    }
  }

  goToPage(page: number): void {
    if (page > 0 && page <= Math.ceil(this.total / this.limit)) {
      this.pageChange.emit(page);
    }
  }
}
