import {
  BankClosure,
  BankClosuresReport,
} from '@core/interfaces/bank-closures.interface';
import {
  DateInfo,
  DateInterval,
} from '../interfaces/affiliate-master-closures.interface';

export class BankClosureModel implements BankClosure {
  constructor(
    public BankSK: number,
    public BankName: string,
    public TotalClosures: number,
    public TotalAmountGross: number,
    public TotalAmountNet: number,
    public TotalQTY: number,
    public TotalQTYValid: number,
    public TotalTaxISLR: number,
    public TotalCommision: number
  ) {}
}

export class BankClosuresReportModel implements BankClosuresReport {
  constructor(
    public startDate: DateInfo,
    public endDate: DateInfo,
    public dateInterval: DateInterval,
    public banks: BankClosure[]
  ) {}
}
