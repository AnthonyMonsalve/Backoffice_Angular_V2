import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BankClosuresReport } from '@commerce/application/interfaces/banks-total-amount.interface';
import { ChartType } from '@commerce/domain/models/chart.model';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'banks-total-amount-closures',
  templateUrl: './banks-amount-closures.component.html',
})
export class BanksTotalAmountClosuresComponent implements OnInit, OnChanges {
  @Input() bankClosuresData: BankClosuresReport | null = null;
  @ViewChild('chart') chart!: ChartComponent;
  barChart: ChartType = this.getInitialBarChartConfig();
  totalAmount = 0;

  constructor() {}

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
            colors: ['#162253', '#038edc', '#75d5f4', '#f07d31'],
            fontSize: '12px',
          },
        },
      },
    };

    // Forzar la actualización del gráfico
    if (this.chart) {
      this.chart.updateOptions(this.barChart);
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
        height: 350,
        type: 'bar',
      },
      colors: ['#162253', '#038edc', '#75d5f4', '#f07d31'],
      plotOptions: {
        bar: {
          columnWidth: '50%',
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
    };
  }
}
