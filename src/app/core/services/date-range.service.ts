import { Injectable } from '@angular/core';
import {
  getYearlyRange,
  getMonthlyRange,
  getWeeklyRange,
  getSemesterRange,
} from '../utils/date.utils';
import {
  MONTHLY_SORT,
  SEMESTER_SORT,
  WEEKLY_SORT,
  YEARLY_SORT,
} from '@core/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class DateRangeService {
  getDateRange(sortBy: string): { startDate: string; endDate: string } {
    if (sortBy === YEARLY_SORT) {
      return getYearlyRange();
    } else if (sortBy === MONTHLY_SORT) {
      return getMonthlyRange();
    } else if (sortBy === WEEKLY_SORT) {
      return getWeeklyRange();
    } else if (sortBy === SEMESTER_SORT) {
      return getSemesterRange();
    }
    return { startDate: '', endDate: '' }; // Default case, you might want to handle it differently
  }
}
