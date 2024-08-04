import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ChartClosureData,
  ChartOverviewData,
} from '@commerce/application/interfaces/chart.interface';
import { ChartType } from '@commerce/domain/models/chart.model';
import {
  CUSTOM_SORT,
  LAST_15_DAYS,
  LAST_MONTH_SORT,
  LAST_WEEK_SORT,
  MONTHLY_SORT,
  SEMESTER_SORT,
  WEEKLY_SORT,
  YEARLY_SORT,
} from '@core/utils/constants';
import { NumberAbbreviationService } from '@services/charts-amount-formatter.service';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'closures-data-chart',
  templateUrl: './closures-data-chart.component.html',
})
export class ClosuresDataChartComponent
  implements OnInit, OnChanges, AfterViewInit
{
  @Input() chartData!: ChartClosureData;
  @Input() chartOverviewData: ChartOverviewData | null = null;
  @Input() customRangeActive: boolean = false;
  @Input() defaultSort!: string;
  @Input() resetDefaultSort: boolean = false;
  @Input() formattedDateRange: string = '';
  @Output() sortByChange = new EventEmitter<string>();

  @ViewChild('chart') chart!: ChartComponent;

  currentSortBy!: string;
  analyticsChart: ChartType = this.getInitialChartConfig();
  totalAmmount: number = 0;
  countClosures: number = 0;
  totalQTY: number = 0;
  zoomed: boolean = false;
  loading: boolean = true;
  error: boolean = false;

  constructor(private numberAbbreviationService: NumberAbbreviationService) {}

  ngOnInit(): void {
    if (this.chartData) {
      this.updateChartData(this.chartData);
    }
    if (this.chartOverviewData) {
      this.updateChartOverviewData(this.chartOverviewData);
    }
    this.currentSortBy = this.defaultSort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartData && changes.chartData.currentValue) {
      this.updateChartData(changes.chartData.currentValue);
    }
    if (changes.chartOverviewData && changes.chartOverviewData.currentValue) {
      this.updateChartOverviewData(changes.chartOverviewData.currentValue);
    }

    if (this.resetDefaultSort) {
      this.currentSortBy = this.defaultSort;
    }

    console.log(this.currentSortBy);
  }

  ngAfterViewInit(): void {
    // No es necesario agregar el listener aquí porque lo haremos en la configuración del gráfico
  }

  private updateChartData(data: ChartClosureData): void {
    try {
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

      // Verifica si hay datos válidos
      const hasValidData =
        totalAmountData.some((value) => value !== 0) ||
        transactionQuantityData.some((value) => value !== 0) ||
        closuresData.some((value) => value !== 0);

      this.analyticsChart = {
        ...this.analyticsChart,
        labels,
        series: hasValidData
          ? [
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
            ]
          : [],
      };

      this.loading = false;
    } catch (error) {
      this.error = true;
      this.loading = false;
    }
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
        height: 300,
        type: 'line',
        stacked: false,
        offsetY: 20,
        toolbar: {
          show: true,
          tools: {
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
          autoSelected: 'zoom',
        },
        events: {
          zoomed: () => {
            this.zoomed = true;
          },
        },
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
            formatter: (value: number) =>
              this.numberAbbreviationService.abbreviateNumberInSpanish(value),
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
              return `Bs. ${y.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`;
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

  updateSortBy(period: string): void {
    console.log(
      period.charAt(0).toUpperCase() + period.slice(1),
      'period.charAt(0).toUpperCase() + period.slice(1)'
    );
    this.currentSortBy = period.charAt(0).toUpperCase() + period.slice(1);
    this.sortByChange.emit(this.currentSortBy);
    console.log(this.currentSortBy, 'updateSortBy');
  }
}
