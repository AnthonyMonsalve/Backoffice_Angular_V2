import { Component, OnInit } from '@angular/core';
import {
  ChartData,
  ChartOverviewData,
} from '@commerce/application/interfaces/chart.interface';
import { OverviewTerminals } from '@commerce/application/interfaces/overview-terminals.interface';
import { ChartTerminalStatusService } from '@commerce/application/services/chart-terminal-status.service';
import { MerchantService } from 'src/app/_commerce/application/services/data-merchant.service';

@Component({
  selector: 'app-summary-commerce-dashboard',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryCommerceComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  overviewTerminalData: OverviewTerminals | null = null;
  chartData: ChartData | null = null;
  chartOverviewData: ChartOverviewData | null = null;
  totalAffiliatesMaster: number = 0; // Inicializa la variable aquí
  totalAffiliates: number = 0; // Inicializa la variable aquí

  constructor(
    private chartTerminalStatusService: ChartTerminalStatusService,
    private merchantService: MerchantService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Insta Comercio' },
      { label: 'Summary', active: true },
    ];
    this.fetchAffiliatesMasterData();
    this.fetchAffiliateData();
    this.fetchOverviewTerminals();
    this.fetchDataChartOverview('2022-05-15', '2022-06-15');
  }

  private fetchAffiliatesMasterData(): void {
    this.merchantService.getListAffiliatesMaster().subscribe(
      (data) => {
        this.totalAffiliatesMaster = data.metadata.total; // Asigna el valor recibido a la variable
      },
      (error) => {
        console.error('Error fetching affiliates data', error);
        // Considera manejar el error mostrando un mensaje al usuario
      }
    );
  }

  private fetchAffiliateData(): void {
    this.merchantService.getListAffiliates().subscribe(
      (data) => {
        this.totalAffiliates = data.metadata.total; // Asigna el valor recibido a la variable
      },
      (error) => {
        console.error('Error fetching affiliates data', error);
        // Considera manejar el error mostrando un mensaje al usuario
      }
    );
  }

  private fetchOverviewTerminals(): void {
    const search = 'Merchant';
    this.chartTerminalStatusService.getOverviewTerminals(search).subscribe({
      next: (data) => (this.overviewTerminalData = data),
      error: (error) => console.error('Error fetching overview data', error),
      complete: () => console.log('Fetching complete'),
    });
  }

  private fetchDataChartOverview(startDate: string, endDate: string): void {
    this.merchantService
      .getAmountDayBetweenTwoDates(startDate, endDate)
      .subscribe({
        next: (data) => (this.chartData = data),
        error: (error) => console.error('Error fetching chart data', error),
        complete: () => console.log('Fetching complete'),
      });

    this.merchantService
      .getAmountBetweenTwoDates(startDate, endDate)
      .subscribe({
        next: (data) => (this.chartOverviewData = data),
        error: (error) =>
          console.error('Error fetching chart overview data', error),
        complete: () => console.log('Fetching complete'),
      });
  }
}
