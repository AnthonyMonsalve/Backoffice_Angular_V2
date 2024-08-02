import {
  AffiliateClosure,
  AffiliateClosuresReport,
} from '@core/interfaces/affiliate-closures.interface';
import {
  DateInfo,
  DateInterval,
  ClosureInfo,
  Metadata,
} from '../interfaces/affiliate-master-closures.interface';

export class AffiliateClosureModel implements AffiliateClosure {
  constructor(
    public AffiliateName: string,
    public AffiliateSK: number,
    public AffiliateId: string,
    public BankSmallName: string,
    public Closure: ClosureInfo
  ) {}
}

export class AffiliateClosuresReportModel implements AffiliateClosuresReport {
  constructor(
    public startDate: DateInfo,
    public endDate: DateInfo,
    public dateInterval: DateInterval,
    public affiliatesClosures: AffiliateClosure[],
    public metadata: Metadata
  ) {}
}
