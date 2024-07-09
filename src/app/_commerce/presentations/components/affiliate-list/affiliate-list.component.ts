import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Affiliate } from 'src/app/_commerce/domain/models/affiliate.model';

@Component({
  selector: 'app-affiliate-list',
  templateUrl: './affiliate-list.component.html',
})
export class AffiliateListComponent implements OnChanges {
  @Input() affiliates: Affiliate[] = [];
  @Input() total!: number;
  @Input() page!: number;
  @Input() limit!: number;
  @Input() TitleNotFound!: string;
  @Input() MessageNotFound!: string;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

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
}
