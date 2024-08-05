import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage',
})
export class PercentagePipe implements PipeTransform {
  transform(value: number, total: number, decimals: number = 2): string {
    if (total === 0) return '0'; // Evita la división por cero
    const percentage = (value / total) * 100;
    return `${percentage.toFixed(decimals)}`;
  }
}
