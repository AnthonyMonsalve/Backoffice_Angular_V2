import { Component, inject, signal } from '@angular/core';
import { ReportService } from 'src/app/reports/applications/services/report.service';

@Component({
  selector: 'app-terminal-activity',
  templateUrl: './terminal-activity.component.html',
  styleUrl: './terminal-activity.component.scss',
})
export class TerminalActivityComponent {
  lista = signal('lista');
  private reportService: ReportService = inject(ReportService);

  ngOnInit() {
    this.lista.set(this.reportService.getReport());
  }
}
