import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  constructor() {}

  getPercent(value: number, total: number): number {
    return (value / total) * 100;
  }
}
