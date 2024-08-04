import { Component, OnInit } from '@angular/core';
import { BankClosuresReport } from '@commerce/application/interfaces/banks-total-amount.interface';
import {
  ChartClosureData,
  ChartOverviewData,
} from '@commerce/application/interfaces/chart.interface';
import { OverviewTerminals } from '@commerce/application/interfaces/overview-terminals.interface';
import { AffiliateMasterClosure } from '@core/interfaces/affiliate-master-closures.interface';
import { LAST_MONTH_SORT, MONTHLY_SORT } from '@core/utils/constants';
import { DateRangeService } from '@services/date-range.service';
import { FactClosureService } from '@services/fact-closure.service';
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
  affiliateMasterClosure!: AffiliateMasterClosure[];
  chartData!: ChartClosureData;
  chartOverviewData: ChartOverviewData | null = null;
  totalAffiliatesMaster: number = 0; // Inicializa la variable aquí
  totalAffiliates: number = 0; // Inicializa la variable aquí
  showErrorModal: boolean = false;
  customRangeActive: boolean = false;
  customBankRangeActive: boolean = false;
  customTopCommerceRangeActive: boolean = false;
  startDate: string = '';
  endDate: string = '';
  formattedDateRange: string = '';
  globalCurrentSortBy: string = LAST_MONTH_SORT;
  resetDefaultSort: boolean = false;

  constructor(
    private terminalService: TerminalService,
    private merchantService: MerchantService,
    private dateRangeService: DateRangeService,
    private factService: FactClosureService
  ) {}

  ngOnInit(): void {
    this.initializeBreadcrumb();
    this.initializeData();
  }

  private initializeBreadcrumb(): void {
    this.breadCrumbItems = [
      { label: 'Insta Comercio' },
      { label: 'Summary', active: true },
    ];
  }

  private initializeData(): void {
    this.startDate =
      this.dateRangeService.getDateRange(LAST_MONTH_SORT).startDate;
    this.endDate = this.dateRangeService.getDateRange(LAST_MONTH_SORT).endDate;

    this.formattedDateRange = this.dateRangeService.getSpanishDateRange(
      this.startDate,
      this.endDate
    );
    this.fetchData();
  }

  private fetchData(): void {
    this.loadAffiliateMasterData();
    this.loadAffiliateData();
    this.loadOverviewTerminals();
    this.loadChartData();
    this.loadBankClosures();
    this.loadAffiliateMasterClosures();
  }

  private loadAffiliateMasterData(): void {
    this.merchantService.getListAffiliatesMaster().subscribe(
      (data) => {
        this.totalAffiliatesMaster = data.metadata.total; // Asigna el valor recibido a la variable
      },
      (error) => this.handleError(error)
    );
  }

  private loadAffiliateData(): void {
    this.merchantService.getListAffiliates().subscribe(
      (data) => {
        this.totalAffiliates = data.metadata.total; // Asigna el valor recibido a la variable
      },
      (error) => this.handleError(error)
    );
  }

  private loadOverviewTerminals(): void {
    const search = 'Merchant';
    this.terminalService.getOverviewTerminals(search).subscribe({
      next: (data) => (this.overviewTerminalData = data),
      error: (error) => this.handleError(error),
    });
  }

  private loadBankClosures(): void {
    this.merchantService
      .getBanksAmountBetweenTwoDates(this.startDate, this.endDate)
      .subscribe({
        next: (data) => (this.bankClosuresReport = data),
        error: (error) => this.handleError(error),
      });
  }

  private loadAffiliateMasterClosures(): void {
    this.factService
      .getAffiliatesMasterTotalAmountDateRange(
        'Merchant',
        this.startDate,
        this.endDate
      )
      .subscribe({
        next: (data) => {
          console.log('Data received:', data); // Agrega este console.log para verificar lo recibido
          this.affiliateMasterClosure = data.affiliatesMasterClosures;
        },
        error: (error) => this.handleError(error),
      });
  }

  private loadChartData(): void {
    this.merchantService
      .getAmountDayBetweenTwoDates(this.startDate, this.endDate)
      .subscribe({
        next: (data) => (this.chartData = data),
        error: (error) => this.handleError(error),
      });

    this.merchantService
      .getAmountBetweenTwoDates(this.startDate, this.endDate)
      .subscribe({
        next: (data) => (this.chartOverviewData = data),
        error: (error) => this.handleError(error),
        complete: () => console.log('Fetching complete'),
      });
  }

  private handleError(error: any): void {
    console.error('An error occurred:', error);
    this.showErrorModal = true;
  }

  //Sort independiente para cada cuadro
  onSortBankByChange(sortBy: string): void {
    this.customBankRangeActive = false;
    this.resetDefaultSort = false;
    this.updateDateRange(sortBy);
    this.loadBankClosures();
  }

  onSortTopCommercesByChange(sortBy: string): void {
    this.customTopCommerceRangeActive = false;
    this.resetDefaultSort = false;
    this.updateDateRange(sortBy);
    this.loadAffiliateMasterClosures();
  }

  //Sort independiente para cada cuadro
  onSortByChange(sortBy: string): void {
    this.customRangeActive = false;
    this.resetDefaultSort = false;
    this.updateDateRange(sortBy);
    this.loadChartData();
  }

  private updateDateRange(sortBy: string): void {
    const { startDate, endDate } = this.dateRangeService.getDateRange(sortBy);
    this.startDate = startDate;
    this.endDate = endDate;
    // this.formattedDateRange = this.dateRangeService.getSpanishDateRange(
    //   startDate,
    //   endDate
    // );
  }

  resetCustomRangeSet(): void {
    this.initializeData();
    this.resetDefaultSort = true;
    this.customRangeActive = false;
    this.customTopCommerceRangeActive = false;
    this.customBankRangeActive = false;
  }

  //Sort custom global para todos los cuadro
  handleDateRange(dateRange: string): void {
    this.customRangeActive = true;
    this.customBankRangeActive = true;
    this.customTopCommerceRangeActive = true;
    const [startDate, endDate] = dateRange.split(' to ');

    this.startDate = startDate;
    this.endDate = endDate;
    this.formattedDateRange = this.dateRangeService.getSpanishDateRange(
      startDate,
      endDate
    );

    this.loadChartData();
    this.loadBankClosures();
    this.loadAffiliateMasterClosures();
  }

  closeModal(): void {
    this.showErrorModal = false;
  }
}
