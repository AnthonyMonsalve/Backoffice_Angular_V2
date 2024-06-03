import { IReportRepository } from '../../domains/repositories/report.repository';

export class ReportImp2Repository implements IReportRepository {
  getReport() {
    return 'Prueba!';
  }
}
