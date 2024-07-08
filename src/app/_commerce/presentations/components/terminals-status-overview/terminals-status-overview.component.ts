import { Component, OnInit } from '@angular/core';
import { Overview } from 'src/app/_commerce/application/interfaces/overview.interface';
import { ChartType } from 'src/app/_commerce/domain/models/chart.model';
import { ChartTerminalStatusService } from '../../../application/services/chart-terminal-status.service';

@Component({
  selector: 'terminal-status-overview',
  templateUrl: './terminals-status-overview.component.html',
})
export class TerminalsStatusOverviewComponent implements OnInit {
  donutChart: ChartType = this.getInitialDonutChartConfig();
  countTerminals = 0;

  constructor(private ChartTerminalStatusService: ChartTerminalStatusService) {}

  ngOnInit(): void {
    this.fetchChartData();
  }

  private fetchChartData(): void {
    this.ChartTerminalStatusService.getTerminalsStatusOverview().subscribe({
      next: (data) => this.updateChartData(data),
      error: (error) => console.error('Error fetching chart data', error),
      complete: () => console.log('Fetching complete'),
    });
  }

  private updateChartData(data: Overview): void {
    this.donutChart.series = [
      data.terminalActiveCount,
      data.terminalInactiveCount,
    ];
    this.donutChart.labels = ['Activos', 'Inactivos'];
    this.donutChart.colors = ['#038edc', '#263375'];
    this.countTerminals = data.terminalCount;
  }

  private getInitialDonutChartConfig(): ChartType {
    return {
      chart: {
        height: 245,
        type: 'donut',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
      },
    };
  }
}
