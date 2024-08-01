import {
  DateInfo,
  DateInterval,
  ClosureInfo,
  AffiliateMasterClosure,
  Metadata,
  AffiliateMasterClosuresReport,
} from '../interfaces/affiliate-master-closures.interface';

export class DateInfoModel implements DateInfo {
  constructor(
    public date: string,
    public spanish: string,
    public english: string
  ) {}
}

export class DateIntervalModel implements DateInterval {
  constructor(
    public days: number,
    public weeks: number,
    public months: number,
    public years: number
  ) {}
}

export class ClosureInfoModel implements ClosureInfo {
  constructor(
    public CountClosures: number,
    public TotalQTY: number,
    public TotalQTYValid: number,
    public TotalAmountGross: number,
    public TotalAmountNet: number,
    public TotalTaxISLR: number,
    public TotalCommision: number
  ) {}
}

export class AffiliateMasterClosureModel implements AffiliateMasterClosure {
  constructor(
    public AffiliateMasterName: string,
    public AffiliateMasterSK: number,
    public AffiliateMasterId: string,
    public Closure: ClosureInfo
  ) {}
}

export class MetadataModel implements Metadata {
  constructor(
    public total: number,
    public page: number,
    public lastPage: number
  ) {}
}

export class AffiliateMasterClosuresReportModel
  implements AffiliateMasterClosuresReport
{
  constructor(
    public startDate: DateInfo,
    public endDate: DateInfo,
    public dateInterval: DateInterval,
    public affiliatesMasterClosures: AffiliateMasterClosure[],
    public metadata: Metadata
  ) {}
}
