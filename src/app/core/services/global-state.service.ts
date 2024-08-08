import { Injectable } from '@angular/core';
import { MONTHLY_SORT } from '@core/utils/date-range-constants';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private _currentSortBy: string = MONTHLY_SORT;

  get currentSortBy(): string {
    return this._currentSortBy;
  }

  set currentSortBy(value: string) {
    this._currentSortBy = value;
  }
}
