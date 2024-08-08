import { Injectable } from '@angular/core';
import { LAST_60_DAYS } from '@core/utils/date-range-constants';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private _currentSortBy: string = LAST_60_DAYS;

  get currentSortBy(): string {
    return this._currentSortBy;
  }

  set currentSortBy(value: string) {
    this._currentSortBy = value;
  }
}
