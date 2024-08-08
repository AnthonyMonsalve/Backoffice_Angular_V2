import { Component, OnInit } from '@angular/core';
import { BankClosuresReport } from '@commerce/application/interfaces/banks-total-amount.interface';
import {
  ChartClosureData,
  ChartOverviewData,
} from '@commerce/application/interfaces/chart.interface';
import { AffiliateMasterClosure } from '@core/interfaces/affiliate-master-closures.interface';
import { OverviewTerminals } from '@core/interfaces/overview-terminals.interface';
import { LAST_MONTH_SORT } from '@core/utils/date-range-constants';
import { AffiliateMasterService } from '@services/affiliate-master.service';
import { AffiliateService } from '@services/affiliate.service';
import { FactClosureService } from '@services/fact-closure.service';
import { TerminalService } from '@services/terminal.service';
import { DateRangeService } from '@services/utils/date-range.service';
import { InstapagoService } from '@web/application/services/data-instapago.service';

@Component({
  selector: 'app-summary-commerce-dashboard',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryWebComponent implements OnInit {
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
  closureDataChartFormattedDateRange: string = '';
  closureBanksAmountFormattedDateRange: string = '';
  closureTopCommercesFormattedDateRange: string = '';
  globalCurrentSortBy: string = LAST_MONTH_SORT;
  resetDefaultSort: boolean = false;

  isLoadingtotalAffiliatesMaster: boolean = false;
  isLoadingtotalAffiliates: boolean = false;
  isLoadingDatachart: boolean = false;
  isLoadingOverviewDatachart: boolean = false;
  isLoadingTerminalData: boolean = false;

  constructor(
    private terminalService: TerminalService,
    private instapagoService: InstapagoService,
    private dateRangeService: DateRangeService,
    private factService: FactClosureService,
    private affiliateMasterService: AffiliateMasterService,
    private affiliateService: AffiliateService
  ) {}

  ngOnInit(): void {
    this.initializeBreadcrumb();
    this.initializeData();
  }

  private initializeBreadcrumb(): void {
    this.breadCrumbItems = [
      { label: 'Insta Web' },
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
    this.isLoadingtotalAffiliatesMaster = true;
    this.affiliateMasterService
      .getListAffiliatesMaster({
        search: 'Instapago',
      })
      .subscribe(
        (data) => {
          this.totalAffiliatesMaster = data.metadata.total;
          this.isLoadingtotalAffiliatesMaster = false; // Asigna el valor recibido a la variable
        },
        (error) => {
          this.handleError(error);
          this.isLoadingtotalAffiliatesMaster = false;
        }
      );
  }

  private loadAffiliateData(): void {
    this.isLoadingtotalAffiliates = true;
    this.affiliateService.getListAffiliates({ search: 'Instapago' }).subscribe(
      (data) => {
        this.totalAffiliates = data.metadata.total; // Asigna el valor recibido a la variable
        this.isLoadingtotalAffiliates = false; // Asigna el valor recibido a la variable
      },
      (error) => {
        this.handleError(error);
        this.isLoadingtotalAffiliates = false; // Asigna el valor recibido a la variable
      }
    );
  }

  private loadOverviewTerminals(): void {
    this.isLoadingTerminalData = true;
    this.terminalService.getOverviewTerminals('Instapago').subscribe({
      next: (data) => {
        this.overviewTerminalData = data;
        this.isLoadingTerminalData = false;
      },
      error: (error) => this.handleError(error),
    });
  }

  private loadBankClosures(): void {
    this.instapagoService
      .getBanksAmountBetweenTwoDates(this.startDate, this.endDate)
      .subscribe({
        next: (data) => (this.bankClosuresReport = data),
        error: (error) => this.handleError(error),
      });
  }

  private loadAffiliateMasterClosures(): void {
    this.factService
      .getAffiliatesMasterTotalAmountDateRange(
        'Instapago',
        this.startDate,
        this.endDate
      )
      .subscribe({
        next: (data) => {
          this.affiliateMasterClosure = data.affiliatesMasterClosures;
        },
        error: (error) => this.handleError(error),
      });
  }

  private loadChartData(): void {
    this.isLoadingDatachart = true;
    this.isLoadingOverviewDatachart = true;

    this.instapagoService
      .getAmountDayBetweenTwoDates(this.startDate, this.endDate)
      .subscribe({
        next: (data) => {
          this.chartData = data;
          this.isLoadingDatachart = false;
        },
        error: (error) => this.handleError(error),
      });

    this.instapagoService
      .getAmountBetweenTwoDates(this.startDate, this.endDate)
      .subscribe({
        next: (data) => {
          this.chartOverviewData = data;
          this.isLoadingOverviewDatachart = false;
        },
        error: (error) => this.handleError(error),
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
    this.closureBanksAmountFormattedDateRange =
      this.dateRangeService.getSpanishDateRange(this.startDate, this.endDate);
  }

  onSortTopCommercesByChange(sortBy: string): void {
    this.customTopCommerceRangeActive = false;
    this.resetDefaultSort = false;
    this.updateDateRange(sortBy);
    this.loadAffiliateMasterClosures();
    this.closureTopCommercesFormattedDateRange =
      this.dateRangeService.getSpanishDateRange(this.startDate, this.endDate);
  }

  //Sort independiente para cada cuadro
  onSortByChange(sortBy: string): void {
    this.customRangeActive = false;
    this.resetDefaultSort = false;
    this.updateDateRange(sortBy);
    this.loadChartData();
    this.closureDataChartFormattedDateRange =
      this.dateRangeService.getSpanishDateRange(this.startDate, this.endDate);
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
    this.closureDataChartFormattedDateRange = '';
    this.closureBanksAmountFormattedDateRange = '';
    this.closureTopCommercesFormattedDateRange = '';

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
