import { Inject, Injectable } from '@angular/core';
import { IReportRepository } from '../../domains/repositories/report.repository';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(
    @Inject('ReportRepeeositoryInterface')
    private reportRepository: IReportRepository
  ) {}

  getReport(): string {
    const report = this.reportRepository.getReport();
    if (report === 'Report') {
      return report;
    } else {
      return 'Report not found';
    }
  }
}
