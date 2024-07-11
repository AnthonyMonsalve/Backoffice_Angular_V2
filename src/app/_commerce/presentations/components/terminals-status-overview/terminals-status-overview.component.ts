import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { OverviewTerminals } from '@commerce/application/interfaces/overview-terminals.interface';
import { ChartType } from '@commerce/domain/models/chart.model';

@Component({
  selector: 'terminal-status-overview',
  templateUrl: './terminals-status-overview.component.html',
})
export class TerminalsStatusOverviewComponent implements OnInit, OnChanges {
  @Input() overviewData: OverviewTerminals | null = null;
  donutChart: ChartType = this.getInitialDonutChartConfig();
  countTerminals = 0;

  constructor() {}

  ngOnInit(): void {
    if (this.overviewData) {
      this.updateChartData(this.overviewData);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.overviewData && changes.overviewData.currentValue) {
      this.updateChartData(changes.overviewData.currentValue);
    }
  }

  private updateChartData(data: OverviewTerminals): void {
    this.donutChart.series = [
      data.terminals.terminalActiveCount,
      data.terminals.terminalInactiveCount,
    ];
    this.donutChart.labels = ['Activos', 'Inactivos'];
    this.donutChart.colors = ['#038edc', '#263375'];
    this.countTerminals = data.terminals.terminalCount;
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
