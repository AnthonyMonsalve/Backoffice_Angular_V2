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

  @ViewChild('dateRangePicker') dateRangePicker!: ElementRef;

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
  }
}
