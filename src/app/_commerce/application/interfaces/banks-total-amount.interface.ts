interface DateInfo {
  date: string; // ISO date string
  spanish: string;
  english: string;
}

interface DateInterval {
  days: number;
  weeks: number;
  months: number;
  years: number;
}

interface BankClosureInfo {
  BankSK: number;
  BankName: string;
  TotalClosures: number;
  TotalAmountGross: number;
  TotalAmountNet: number;
  TotalQTY: number;
  TotalQTYValid: number;
  TotalTaxISLR: number;
  TotalCommision: number;
}

export interface BankClosuresReport {
  startDate: DateInfo;
  endDate: DateInfo;
  dateInterval: DateInterval;
  banks: BankClosureInfo[];
}
