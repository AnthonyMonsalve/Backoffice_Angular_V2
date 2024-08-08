import {
  LAST_15_DAYS,
  LAST_MONTH_SORT,
  LAST_WEEK_SORT,
  MONTHLY_SORT,
  SEMESTER_SORT,
  WEEKLY_SORT,
  YEARLY_SORT,
} from '@core/utils/date-range-constants';
import { DropdownItem } from './dropdown.model';

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
    action: LAST_MONTH_SORT,
    name: 'DROPDOWN_RANGE_SELECT.LAST_MONTH.TEXT',
  },
];
