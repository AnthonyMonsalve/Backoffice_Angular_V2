export interface DateInfo {
  date: string; // ISO date string
  spanish: string;
  english: string;
}

export interface DateInterval {
  days: number;
  weeks: number;
  months: number;
  years: number;
}

export interface ClosureInfo {
  CountClosures: number;
  TotalQTY: number;
  TotalQTYValid: number;
  TotalAmountGross: number;
  TotalAmountNet: number;
  TotalTaxISLR: number;
  TotalCommision: number;
}

export interface AffiliateMasterClosure {
  AffiliateMasterName: string;
  AffiliateMasterSK: number;
  AffiliateMasterId: string;
  Closure: ClosureInfo;
}

export interface Metadata {
  total: number;
  page: number;
  lastPage: number;
}

export interface AffiliateMasterClosuresReport {
  startDate: DateInfo;
  endDate: DateInfo;
  dateInterval: DateInterval;
  affiliatesMasterClosures: AffiliateMasterClosure[];
  metadata: Metadata;
}
