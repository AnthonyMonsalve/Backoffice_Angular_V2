import { Component, OnInit } from '@angular/core';
import { BankClosuresReport } from '@commerce/application/interfaces/banks-total-amount.interface';
import {
  ChartClosureData,
  ChartOverviewData,
} from '@commerce/application/interfaces/chart.interface';
import { OverviewTerminals } from '@commerce/application/interfaces/overview-terminals.interface';
import { MONTHLY_SORT } from '@core/utils/constants';
import { DateRangeService } from '@services/date-range.service';
import { TerminalService } from '@services/terminal.service';
import { MerchantService } from 'src/app/_commerce/application/services/data-merchant.service';

@Component({
  selector: 'app-summary-commerce-dashboard',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryCommerceComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  overviewTerminalData: OverviewTerminals | null = null;
  bankClosuresReport: BankClosuresReport | null = null;
  chartData!: ChartClosureData;
  chartOverviewData: ChartOverviewData | null = null;
  totalAffiliatesMaster: number = 0; // Inicializa la variable aquí
  totalAffiliates: number = 0; // Inicializa la variable aquí
  customRangeChartActive: boolean = false;
  showErrorModal: boolean = false;
  customRangeActive: boolean = false;
  customBankRangeActive: boolean = true;

  constructor(
    private terminalService: TerminalService,
    private merchantService: MerchantService,
    private dateRangeService: DateRangeService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Insta Comercio' },
      { label: 'Summary', active: true },
    ];
    this.fetchAffiliatesMasterData();
    this.fetchAffiliateData();
    this.fetchOverviewTerminals();
    const { startDate, endDate } =
      this.dateRangeService.getDateRange(MONTHLY_SORT);
    this.fetchDataChartOverview(startDate, endDate);
    this.fetchBanksTotalClosures(startDate, endDate);
  }

  private fetchAffiliatesMasterData(): void {
    this.merchantService.getListAffiliatesMaster().subscribe(
      (data) => {
        this.totalAffiliatesMaster = data.metadata.total; // Asigna el valor recibido a la variable
      },
      (error) => {
        console.error('Error fetching affiliates data', error);
        this.showErrorModal = true;
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
        this.showErrorModal = true;
      }
    );
  }

  private fetchOverviewTerminals(): void {
    const search = 'Merchant';
    this.terminalService.getOverviewTerminals(search).subscribe({
      next: (data) => (this.overviewTerminalData = data),
      error: (error) => {
        console.error('Error fetching overview data', error);
        this.showErrorModal = true;
      },
    });
  }

  private fetchBanksTotalClosures(startDate: string, endDate: string): void {
    const search = 'Merchant';
    this.merchantService
      .getBanksAmountBetweenTwoDates(startDate, endDate)
      .subscribe({
        next: (data) => (this.bankClosuresReport = data),
        error: (error) => {
          console.error('Error fetching overview data', error);
          this.showErrorModal = true;
        },
      });
  }

  private fetchDataChartOverview(startDate: string, endDate: string): void {
    this.merchantService
      .getAmountDayBetweenTwoDates(startDate, endDate)
      .subscribe({
        next: (data) => (this.chartData = data),
        error: (error) => {
          console.error('Error fetching chart data', error);
          this.showErrorModal = true;
        },
      });

    this.merchantService
      .getAmountBetweenTwoDates(startDate, endDate)
      .subscribe({
        next: (data) => (this.chartOverviewData = data),
        error: (error) => {
          console.error('Error fetching chart overview data', error);
          this.showErrorModal = true;
        },
        complete: () => console.log('Fetching complete'),
      });
  }

  //Sort independiente para cada cuadro
  onSortBandkByChange(sortBy: string): void {
    this.customBankRangeActive = false;
    const { startDate, endDate } = this.dateRangeService.getDateRange(sortBy);
    this.fetchBanksTotalClosures(startDate, endDate);
  }

  //Sort independiente para cada cuadro
  onSortByChange(sortBy: string): void {
    this.customRangeActive = false;
    const { startDate, endDate } = this.dateRangeService.getDateRange(sortBy);
    this.fetchDataChartOverview(startDate, endDate);
  }

  //Sort custom global para todos los cuadro
  handleDateRange(dateRange: string): void {
    this.customRangeActive = true;
    this.customBankRangeActive = true;
    const [startDate, endDate] = dateRange.split(' to ');
    this.fetchDataChartOverview(startDate, endDate);
    this.fetchBanksTotalClosures(startDate, endDate);
  }

  closeModal(): void {
    this.showErrorModal = false;
  }
}
