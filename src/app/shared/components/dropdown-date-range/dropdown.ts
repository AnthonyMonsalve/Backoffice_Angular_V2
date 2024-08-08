import { DropdownItem } from '@core/interfaces/dropdown-date-range.interface';
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

export const DROPDOWN: DropdownItem[] = [
  {
    action: WEEKLY_SORT,
    name: 'DROPDOWN_RANGE_SELECT.THIS_WEEK.TEXT',
  },
  {
    action: MONTHLY_SORT,
    name: 'DROPDOWN_RANGE_SELECT.THIS_MONTH.TEXT',
  },
  {
    action: SEMESTER_SORT,
    name: 'DROPDOWN_RANGE_SELECT.THIS_SEMESTER.TEXT',
  },
  {
    action: YEARLY_SORT,
    name: 'DROPDOWN_RANGE_SELECT.THIS_YEAR.TEXT',
  },
  {
    action: LAST_WEEK_SORT,
    name: 'DROPDOWN_RANGE_SELECT.LAST_WEEK.TEXT',
  },
  {
    action: LAST_15_DAYS,
    name: 'DROPDOWN_RANGE_SELECT.LAST_15_DAYS.TEXT',
  },
  {
    action: LAST_28_DAYS,
    name: 'DROPDOWN_RANGE_SELECT.LAST_28_DAYS.TEXT',
  },
  {
    action: LAST_30_DAYS,
    name: 'DROPDOWN_RANGE_SELECT.LAST_30_DAYS.TEXT',
  },
  {
    action: LAST_MONTH_SORT,
    name: 'DROPDOWN_RANGE_SELECT.LAST_MONTH.TEXT',
  },
  {
    action: LAST_60_DAYS,
    name: 'DROPDOWN_RANGE_SELECT.LAST_60_DAYS.TEXT',
  },
  {
    action: LAST_90_DAYS,
    name: 'DROPDOWN_RANGE_SELECT.LAST_90_DAYS.TEXT',
  },
  {
    action: LAST_3_MONTHS,
    name: 'DROPDOWN_RANGE_SELECT.LAST_3_MONTHS.TEXT',
  },
  {
    action: LAST_12_MONTHS,
    name: 'DROPDOWN_RANGE_SELECT.LAST_12_MONTHS.TEXT',
  },
];
