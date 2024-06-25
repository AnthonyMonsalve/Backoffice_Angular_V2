import { Component, OnInit } from '@angular/core';
import { MerchantService } from '@services/data-merchant.service';
import { ChartType } from 'src/app/_commerce/domain/models/chart.model';

@Component({
  selector: 'terminal-status-overview',
  templateUrl: './terminals-status-overview.component.html',
})
export class TerminalsStatusOverview implements OnInit {
  donutChart: ChartType = {
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

  countTerminals = 0;

  constructor(private merchantService: MerchantService) {}

  ngOnInit(): void {
    this.fetchChartData();
  }

  private fetchChartData(): void {
    this.merchantService.getOverviewTerminalsStatus().subscribe(
      (data) => {
        this.updateChartData(data);
      },
      (error) => {
        console.error('Error fetching chart data', error);
        // Podrías mostrar un mensaje de error al usuario aquí
      }
    );
  }

  private updateChartData(data: any): void {
    this.donutChart.series = [data.activeCount, data.inactiveCount];
    this.donutChart.labels = ['Activos', 'Inactivos'];
    this.donutChart.colors = ['#038edc', '#263375'];
    this.countTerminals = data.count;
  }
}
