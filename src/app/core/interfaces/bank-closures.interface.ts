import { DateInfo, DateInterval } from './affiliate-master-closures.interface';

export interface BankClosure {
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
  banks: BankClosure[];
}
