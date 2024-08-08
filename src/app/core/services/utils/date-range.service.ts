import { Injectable } from '@angular/core';
import {
  LAST_15_DAYS,
  LAST_MONTH_SORT,
  LAST_WEEK_SORT,
  MONTHLY_SORT,
  SEMESTER_SORT,
  WEEKLY_SORT,
  YEARLY_SORT,
} from '@core/utils/date-range-constants';
import {
  formatSpanishDateRange,
  getLast15DaysRange,
  getLastMonthRange,
  getLastWeekRange,
  getMonthlyRange,
  getSemesterRange,
  getWeeklyRange,
  getYearlyRange,
} from '../../utils/date.utils';

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
    } else if (sortBy === LAST_MONTH_SORT) {
      return getLastMonthRange();
    } else if (sortBy === LAST_WEEK_SORT) {
      return getLastWeekRange();
    } else if (sortBy === LAST_15_DAYS) {
      return getLast15DaysRange();
    }
    return { startDate: '', endDate: '' }; // Default case, you might want to handle it differently
  }

  getSpanishDateRange(startDate: string, endDate: string): string {
    return formatSpanishDateRange(startDate, endDate);
  }
}
