import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NumberAbbreviationService {
  abbreviateNumberInSpanish(value: number): string {
    if (value >= 1_000_000_000) {
      return `Bs. ${(value / 1_000_000_000).toFixed(1)}MM`; // Mil millones
    } else if (value >= 1_000_000) {
      return `Bs. ${(value / 1_000_000).toFixed(1)}M`; // Millones
    } else if (value >= 1_000) {
      return `Bs. ${(value / 1_000).toFixed(1)}k`; // Miles
    } else {
      return `Bs. ${value.toString()}`;
    }
  }
}
