import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
})
export class DateRangePickerComponent implements OnChanges {
  @Input() customRangeChartActive: boolean = false;
  @Output() dateRangeSet = new EventEmitter<string>();
  @Output() resetCustomRangeSet = new EventEmitter();
  resetCustomRange: boolean = false;
  maxDateFormatted!: string;

  @ViewChild('dateRangePicker') dateRangePicker!: ElementRef;

  ngOnInit(): void {
    const today = new Date();
    this.maxDateFormatted = this.formatDateToYMD(today);
  }

  ngOnChanges(): void {
    if (this.customRangeChartActive) {
      this.dateRangePicker.nativeElement.value = '';
      setTimeout(() => this.dateRangePicker.nativeElement.focus(), 0);
    }
  }

  onEstablecer(): void {
    const dateRangeValue = this.dateRangePicker.nativeElement.value;
    if (!dateRangeValue) {
      this.dateRangePicker.nativeElement.focus();
      return;
    }
    this.dateRangeSet.emit(dateRangeValue);
    this.resetCustomRange = true;
  }

  onResetCustomRange(): void {
    this.dateRangePicker.nativeElement.value = '';
    const flatpickrInstance = (this.dateRangePicker.nativeElement as any)
      ._flatpickr;
    if (flatpickrInstance) {
      flatpickrInstance.clear(); // Limpia las fechas seleccionadas
    }
    this.resetCustomRange = false;
    this.resetCustomRangeSet.emit();
  }

  formatDateToYMD(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
