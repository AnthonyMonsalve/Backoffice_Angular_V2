import { Injectable } from '@angular/core';
import {
  LAST_12_MONTHS,
  LAST_15_DAYS,
  LAST_28_DAYS,
  LAST_30_DAYS,
  LAST_3_MONTHS,
  LAST_60_DAYS,
  LAST_90_DAYS,
  LAST_MONTH_SORT,
  LAST_WEEK_SORT,
  MONTHLY_SORT,
  SEMESTER_SORT,
  WEEKLY_SORT,
  YEARLY_SORT,
} from '@core/utils/date-range-constants';
import {
  formatSpanishDateRange,
  getDateRangeForMonths,
  getLastMonthRange,
  getLastNDaysRange,
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
      return getLastNDaysRange(15);
    } else if (sortBy === LAST_28_DAYS) {
      return getLastNDaysRange(28);
    } else if (sortBy === LAST_30_DAYS) {
      return getLastNDaysRange(30);
    } else if (sortBy === LAST_60_DAYS) {
      return getLastNDaysRange(60);
    } else if (sortBy === LAST_90_DAYS) {
      return getLastNDaysRange(90);
    } else if (sortBy === LAST_3_MONTHS) {
      return getDateRangeForMonths(3);
    } else if (sortBy === LAST_12_MONTHS) {
      return getDateRangeForMonths(12);
    }
    return { startDate: '', endDate: '' }; // Default case, you might want to handle it differently
  }

  getSpanishDateRange(startDate: string, endDate: string): string {
    return formatSpanishDateRange(startDate, endDate);
  }
}
