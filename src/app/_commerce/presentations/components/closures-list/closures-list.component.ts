import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Closure } from '@core/models/closure.model';

@Component({
  selector: 'app-closures-list',
  templateUrl: './closures-list.component.html',
})
export class ClosuresListComponent implements OnChanges {
  @Input() closures: Closure[] = [];
  @Input() total!: number;
  @Input() page!: number;
  @Input() limit!: number;
  @Input() TitleNotFound!: string;
  @Input() MessageNotFound!: string;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() sortOrderEmitter: EventEmitter<any> = new EventEmitter<any>();

  sort: string = 'TimeId';
  order: string = 'DESC';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.total || changes.page || changes.limit) {
      this.updatePagination();
    }
  }

  updatePagination(): void {
    // Lógica para actualizar la paginación si es necesario
  }

  onPageChange(newPage: number): void {
    this.pageChange.emit(newPage);
  }

  changeSort(column: string): void {
    if (this.sort === column) {
      this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sort = column;
      this.order = 'ASC';
    }

    const sortOrder = {
      sort: this.sort,
      order: this.order,
    };

    this.sortOrderEmitter.emit(sortOrder);
  }
}
