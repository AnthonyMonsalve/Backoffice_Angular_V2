import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToDate',
})
export class NumberToDatePipe implements PipeTransform {
  private readonly monthNames = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  transform(value: number): string {
    if (!value) {
      return '';
    }

    // Convert the number to a string
    const valueStr = value.toString();

    // Extract year, month, and day from the string
    const year = valueStr.substring(0, 4);
    const month = valueStr.substring(4, 6);
    const day = valueStr.substring(6, 8);

    // Convert month number to month name in Spanish
    const monthIndex = parseInt(month, 10) - 1;
    const monthName = this.monthNames[monthIndex];

    // Return the formatted date
    return `${day} de ${monthName} de ${year}`;
  }
}
