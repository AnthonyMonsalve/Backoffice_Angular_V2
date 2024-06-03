import { IReportRepository } from '../../domains/repositories/report.repository';

export class ReportImpRepository implements IReportRepository {
  getReport() {
    return 'Report';
  }
}
