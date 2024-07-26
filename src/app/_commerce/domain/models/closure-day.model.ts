export interface DateInfo {
  dateTime: string;
  year: number;
  yearDay: number;
  month: number;
  day: number;
  weekDay: number;
  monthName: string;
  quarter: number;
}

export interface ClosureInfo {
  totalGross: number;
  totalNet: number;
  totalTax: number;
  totalCommision: number;
  valid_txn: number;
  total_txn: number;
  qty_closures: number;
}

export interface ClosureDay {
  timeId: number;
  date: DateInfo;
  closure: ClosureInfo;
}
