import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  ChartData,
  ChartOverviewData,
} from '@commerce/application/interfaces/chart.interface';
import { ChartType } from '@commerce/domain/models/chart.model';

@Component({
  selector: 'closures-data-chart',
  templateUrl: './closures-data-chart.component.html',
})
export class ClosuresDataChartComponent implements OnInit, OnChanges {
  @Input() chartData: ChartData | null = null;
  @Input() chartOverviewData: ChartOverviewData | null = null;

  analyticsChart: ChartType = this.getInitialChartConfig();
  totalAmmount: number = 0;
  countClosures: number = 0;
  totalQTY: number = 0;

  ngOnInit(): void {
    if (this.chartData) {
      this.updateChartData(this.chartData);
    }
    if (this.chartOverviewData) {
      this.updateChartOverviewData(this.chartOverviewData);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartData && changes.chartData.currentValue) {
      this.updateChartData(changes.chartData.currentValue);
    }
    if (changes.chartOverviewData && changes.chartOverviewData.currentValue) {
      this.updateChartOverviewData(changes.chartOverviewData.currentValue);
    }
  }

  private updateChartData(data: ChartData): void {
    const labels = data.closures.map((closure) => closure.date.dateTime);
    const totalAmountData = data.closures.map(
      (closure) => closure.closure.totalGross
    );
    const transactionQuantityData = data.closures.map(
      (closure) => closure.closure.total_txn
    );
    const closuresData = data.closures.map(
      (closure) => closure.closure.qty_closures
    );

    this.analyticsChart = {
      ...this.analyticsChart,
      labels,
      series: [
        {
          name: 'Total Amount',
          type: 'column',
          data: totalAmountData,
        },
        {
          name: 'Closures',
          type: 'line',
          data: closuresData,
        },
        {
          name: 'Transaction Quantity',
          type: 'line',
          data: transactionQuantityData,
        },
      ],
    };
  }

  private updateChartOverviewData(data: ChartOverviewData): void {
    const overview = data.totalAmount || {
      TotalAmountGross: 0,
      CountClosures: 0,
      TotalQTY: 0,
    };
    this.totalAmmount = overview.TotalAmountGross;
    this.countClosures = overview.CountClosures;
    this.totalQTY = overview.TotalQTY;
  }

  private getInitialChartConfig(): ChartType {
    return {
      chart: {
        height: 332,
        type: 'line',
        stacked: false,
        offsetY: -5,
        toolbar: { show: false },
      },
      stroke: { width: [0, 2, 2], curve: 'smooth' },
      plotOptions: { bar: { columnWidth: '40%' } },
      colors: ['#5fd0f3', '#0F4C60', '#F07D31'],
      fill: {
        opacity: [0.85, 1, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      markers: { size: 0 },
      xaxis: { type: 'datetime' },
      yaxis: [
        {
          title: { text: 'Total Amount', style: { fontWeight: 500 } },
          labels: {
            formatter: (val: any) =>
              `${val.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} Bs`,
          },
        },
        {
          opposite: true,
          title: { text: 'Closures', style: { fontWeight: 500 } },
          labels: { formatter: (val: any) => val.toFixed(0) },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (y: any, { series, seriesIndex }: any) => {
            if (seriesIndex === 0) {
              return `${y.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} Bs`;
            } else if (seriesIndex === 1) {
              return `${y.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })} closures`;
            } else if (seriesIndex === 2) {
              return `${y.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })} transactions`;
            } else {
              return y.toFixed(0) + '';
            }
          },
        },
      },
      grid: {
        borderColor: '#f1f1f1',
        padding: { bottom: 15 },
      },
    };
  }
}
