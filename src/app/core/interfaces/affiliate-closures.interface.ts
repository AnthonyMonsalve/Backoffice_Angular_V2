import {
  DateInfo,
  DateInterval,
  Metadata,
} from './affiliate-master-closures.interface';

export interface ClosureInfo {
  CountClosures: number;
  TotalQTY: number;
  TotalQTYValid: number;
  TotalAmountGross: number;
  TotalAmountNet: number;
  TotalTaxISLR: number;
  TotalCommision: number;
}

export interface AffiliateClosure {
  AffiliateName: string;
  AffiliateSK: number;
  AffiliateId: string;
  BankSmallName: string;
  Closure: ClosureInfo;
}

export interface AffiliateClosuresReport {
  startDate: DateInfo;
  endDate: DateInfo;
  dateInterval: DateInterval;
  affiliatesClosures: AffiliateClosure[];
  metadata: Metadata;
}
