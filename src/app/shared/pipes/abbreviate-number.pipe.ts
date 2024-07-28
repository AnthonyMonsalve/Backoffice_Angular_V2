import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviateNumber',
})
export class AbbreviateNumberPipe implements PipeTransform {
  constructor() {}

  transform(value: number): string {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1) + 'MM'; // Mil millones
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1) + 'M'; // Millones
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(1) + 'k'; // Miles
    } else {
      return value.toString();
    }
  }
}
