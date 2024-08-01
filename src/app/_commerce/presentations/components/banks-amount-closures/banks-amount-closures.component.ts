import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BankClosuresReport } from '@commerce/application/interfaces/banks-total-amount.interface';
import { ChartType } from '@commerce/domain/models/chart.model';
import {
  MONTHLY_SORT,
  WEEKLY_SORT,
  YEARLY_SORT,
  SEMESTER_SORT,
  CUSTOM_SORT,
  LAST_MONTH_SORT,
} from '@core/utils/constants';
import { NumberAbbreviationService } from '@services/charts-amount-formatter.service';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'banks-total-amount-closures',
  templateUrl: './banks-amount-closures.component.html',
})
export class BanksTotalAmountClosuresComponent implements OnInit, OnChanges {
  @Input() bankClosuresData: BankClosuresReport | null = null;
  @Input() customRangeActive: boolean = false;
  @ViewChild('chart') chart!: ChartComponent;
  @Output() sortByChange = new EventEmitter<string>();

  barChart: ChartType = this.getInitialBarChartConfig();
  totalAmount = 0;
  currentSortBy: string = MONTHLY_SORT;
  loading: boolean = true;
  error: boolean = false;

  WEEKLY = WEEKLY_SORT;
  YEARLY = YEARLY_SORT;
  MONTHLY = MONTHLY_SORT;
  SEMESTER = SEMESTER_SORT;
  CUSTOM = CUSTOM_SORT;
  LAST_MONTH = LAST_MONTH_SORT;

  constructor(private numberAbbreviationService: NumberAbbreviationService) {}

  ngOnInit(): void {
    if (this.bankClosuresData) {
      this.updateChartData(this.bankClosuresData);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.bankClosuresData && changes.bankClosuresData.currentValue) {
      this.updateChartData(changes.bankClosuresData.currentValue);
    }
  }

  private updateChartData(data: BankClosuresReport): void {
    const labels = data.banks.map((bank) => bank.BankName);
    const series = data.banks.map((bank) => bank.TotalAmountGross);

    this.barChart = {
      ...this.barChart,
      series: [
        {
          name: 'Total Amount Gross',
          data: series,
        },
      ],
      xaxis: {
        categories: labels,
        labels: {
          style: {
            colors: [
              '#162253',
              '#038EDC',
              '#5675F0',
              '#56B7F0',
              '#2F3F81',
              '#2F6381',
            ],
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (value: number) =>
            this.numberAbbreviationService.abbreviateNumberInSpanish(value),
        },
      },
    };

    // Forzar la actualización del gráfico
    if (this.chart) {
      this.chart.updateOptions(this.barChart, false, true, true);
    }

    // Si necesitas también actualizar el totalAmount
    this.totalAmount = series.reduce((a, b) => a + b, 0);
  }

  private getInitialBarChartConfig(): ChartType {
    return {
      series: [
        {
          name: 'Total Amount Gross',
          data: [],
        },
      ],
      chart: {
        height: 250,
        type: 'bar',
      },
      colors: [
        '#162253',
        '#038EDC',
        '#5675F0',
        '#56B7F0',
        '#2F3F81',
        '#2F6381',
      ],
      plotOptions: {
        bar: {
          columnWidth: '30%',
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: [],
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          formatter: (value: number) =>
            this.numberAbbreviationService.abbreviateNumberInSpanish(value),
        },
      },
      tooltip: {
        y: {
          formatter: (value: number) => `Bs. ${value.toLocaleString('es-ES')}`,
        },
      },
    };
  }

  updateSortBy(period: string): void {
    this.currentSortBy = period.charAt(0).toUpperCase() + period.slice(1);
    this.sortByChange.emit(this.currentSortBy);
  }
}
