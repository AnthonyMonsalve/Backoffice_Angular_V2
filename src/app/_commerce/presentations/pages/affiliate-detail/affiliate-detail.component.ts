import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ChartClosureData,
  ChartOverviewData,
} from '@commerce/application/interfaces/chart.interface';
import { MerchantService } from '@commerce/application/services/data-merchant.service';
import { OverviewTerminals } from '@core/interfaces/overview-terminals.interface';
import { TerminalList } from '@core/interfaces/terminals-list.interface';
import { Affiliate } from '@core/models/affiliate.model';
import { Closure } from '@core/models/closure.model';
import { Terminal } from '@core/models/terminal.model';
import { LAST_MONTH_SORT } from '@core/utils/date-range-constants';
import { AffiliateService } from '@services/affiliate.service';
import { FactClosureService } from '@services/fact-closure.service';
import { GlobalStateService } from '@services/global-state.service';
import { TerminalService } from '@services/terminal.service';
import { DateRangeService } from '@services/utils/date-range.service';

@Component({
  selector: 'app-affiliate-detail',
  templateUrl: './affiliate-detail.component.html',
})
export class AffiliateDetailComponent implements OnInit {
  affiliate: Affiliate | null = null;
  terminals: Terminal[] = [];
  factClosures: Closure[] = [];
  overviewTerminalData: OverviewTerminals | null = null;
  chartData!: ChartClosureData;
  chartOverviewData: ChartOverviewData | null = null;

  limitPageTerminals = 9;
  pageTerminals = 1;
  totalTerminals = 0;
  limitPageClosures = 5;
  pageClosures = 1;
  totalClosures = 0;
  sortClosures = 'TimeId';
  orderClosures = 'DESC';
  customRangeActive: boolean = false;

  globalCurrentSortBy!: string;
  resetDefaultSort: boolean = false;

  showErrorModal: boolean = false;

  formattedDateRange!: string;
  closureDataChartFormattedDateRange: string = '';
  startDate: string = '';
  endDate: string = '';

  affiliateSK: string;

  breadCrumbItems!: Array<{}>;

  isLoadingDatachart: boolean = false;
  isLoadingOverviewDatachart: boolean = false;
  isLoadingTerminalData: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private affiliateService: AffiliateService,
    private terminalService: TerminalService,
    private merchantService: MerchantService,
    private factClosureService: FactClosureService,
    private dateRangeService: DateRangeService,
    private globalStateService: GlobalStateService
  ) {
    // Obtener el parámetro 'sk' de la URL y asegurar que no es nulo
    const affiliateSK = this.route.snapshot.paramMap.get('sk');
    if (!affiliateSK) {
      throw new Error('AffiliateSK is required');
    }
    this.affiliateSK = affiliateSK;
  }

  ngOnInit(): void {
    this.initializeBreadcrumb();
    this.initializeData();
  }

  private initializeBreadcrumb(): void {
    this.breadCrumbItems = [
      { label: 'Insta Comercio' },
      { label: 'Afiliación', active: true },
    ];
  }

  private initializeData(): void {
    this.globalCurrentSortBy = this.globalStateService.currentSortBy;

    this.startDate = this.dateRangeService.getDateRange(
      this.globalCurrentSortBy
    ).startDate;
    this.endDate = this.dateRangeService.getDateRange(
      this.globalCurrentSortBy
    ).endDate;

    this.formattedDateRange = this.dateRangeService.getSpanishDateRange(
      this.startDate,
      this.endDate
    );
    this.fetchData();
  }

  private fetchData(): void {
    this.fetchAffiliate();
    this.fetchAffiliateTerminal();
    this.fetchOverviewTerminals();
    this.fetchDataChartOverview();
    this.fetchClosuresAffiliate();
  }

  private fetchDataChartFromReset(): void {
    this.startDate =
      this.dateRangeService.getDateRange(LAST_MONTH_SORT).startDate;
    this.endDate = this.dateRangeService.getDateRange(LAST_MONTH_SORT).endDate;

    this.formattedDateRange = this.dateRangeService.getSpanishDateRange(
      this.startDate,
      this.endDate
    );
    this.fetchDataChartOverview();
  }

  fetchAffiliate(): void {
    this.affiliateService
      .getAffiliate(this.affiliateSK)
      .subscribe((affiliate: Affiliate) => {
        this.affiliate = affiliate;
      });
  }

  fetchAffiliateTerminal(): void {
    this.terminalService
      .getTerminalsByAffiliate(
        this.affiliateSK,
        this.limitPageTerminals,
        this.pageTerminals
      )
      .subscribe((terminals: TerminalList) => {
        this.terminals = terminals.data;
        this.totalTerminals = terminals.metadata.total; // Suponiendo que el servicio devuelve el total de terminales
        console.log(this.terminals, this.pageTerminals);
      });
  }

  onPageChange(newPage: number): void {
    this.pageTerminals = newPage;
    this.fetchAffiliateTerminal();
  }

  private fetchOverviewTerminals(): void {
    this.isLoadingTerminalData = true;
    this.terminalService
      .getOverviewAffiliateTerminals(this.affiliateSK)
      .subscribe({
        next: (data) => {
          this.overviewTerminalData = data;
          this.isLoadingTerminalData = false;
        },
        error: (error) => this.handleError(error),
        complete: () => console.log('Fetching complete'),
      });
  }

  private fetchDataChartOverview(): void {
    this.isLoadingDatachart = true;
    this.isLoadingOverviewDatachart = true;

    this.factClosureService
      .getAmountDayAffiliateBetweenTwoDates(
        this.startDate,
        this.endDate,
        this.affiliateSK
      )
      .subscribe({
        next: (data) => {
          this.chartData = data;
          this.isLoadingDatachart = false;
        },
        error: (error) => this.handleError(error),
        complete: () =>
          console.log('Fetch getAmountDayAfflBetTwoDates complete'),
      });

    this.factClosureService
      .getAmountAffiliateBetweenTwoDates(
        this.startDate,
        this.endDate,
        this.affiliateSK
      )
      .subscribe({
        next: (data) => {
          this.chartOverviewData = data;
          this.isLoadingOverviewDatachart = false;
        },
        error: (error) => this.handleError(error),
        complete: () =>
          console.log('Fetch getAmountAffBetweenTwoDates complete'),
      });
  }

  private fetchClosuresAffiliate(): void {
    if (!this.affiliateSK) return;

    this.factClosureService
      .getClosuresByAffiliateSK(
        this.affiliateSK,
        this.limitPageClosures,
        this.pageClosures,
        this.sortClosures,
        this.orderClosures
      )
      .subscribe({
        next: (data) => (
          (this.factClosures = data.closures),
          (this.totalClosures = data.metadata.total),
          (this.pageClosures = data.metadata.page)
        ),
        error: (error) => this.handleError(error),
        complete: () => console.log('Fetching complete'),
      });
  }

  private handleError(error: any): void {
    console.error('An error occurred:', error);
    this.showErrorModal = true;
  }

  receiveSortOrder(sortOrder: any): void {
    this.sortClosures = sortOrder.sort;
    this.orderClosures = sortOrder.order;
    this.fetchClosuresAffiliate();
  }

  onPageClosureChange(newPage: number): void {
    this.pageClosures = newPage;
    this.fetchClosuresAffiliate();
  }

  onLimitClosureChange(newLimit: number): void {
    this.limitPageClosures = newLimit;
    this.pageClosures = 1; // Reset to first page
    this.fetchClosuresAffiliate();
  }

  onSortByChange(sortBy: string): void {
    this.customRangeActive = false;
    this.resetDefaultSort = false;
    this.updateDateRange(sortBy);
    this.fetchDataChartOverview();
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
    this.fetchDataChartFromReset();
    this.resetDefaultSort = true;
    this.customRangeActive = false;
  }

  handleDateRange(dateRange: string): void {
    this.customRangeActive = true;
    this.closureDataChartFormattedDateRange = '';

    const [startDate, endDate] = dateRange.split(' to ');

    this.startDate = startDate;
    this.endDate = endDate;
    this.formattedDateRange = this.dateRangeService.getSpanishDateRange(
      startDate,
      endDate
    );

    this.fetchDataChartOverview();
  }

  closeModal(): void {
    this.showErrorModal = false;
  }
}
