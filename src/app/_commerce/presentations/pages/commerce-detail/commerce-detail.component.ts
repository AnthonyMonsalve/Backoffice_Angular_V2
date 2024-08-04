import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ChartClosureData,
  ChartOverviewData,
} from '@commerce/application/interfaces/chart.interface';
import { OverviewTerminals } from '@commerce/application/interfaces/overview-terminals.interface';
import { MerchantService } from '@commerce/application/services/data-merchant.service';
import { AffiliateClosure } from '@core/interfaces/affiliate-closures.interface';
import { AffiliateList } from '@core/interfaces/affiliate-list.interface';
import { AffiliateMaster } from '@core/models/affiliate-master.model';
import { Affiliate } from '@core/models/affiliate.model';
import { LAST_MONTH_SORT } from '@core/utils/constants';
import { AffiliateMasterService } from '@services/affiliate-master.service';
import { AffiliateService } from '@services/affiliate.service';
import { DateRangeService } from '@services/date-range.service';
import { FactClosureService } from '@services/fact-closure.service';
import { TerminalService } from '@services/terminal.service';

@Component({
  selector: 'app-affiliate-master-detail',
  templateUrl: './commerce-detail.component.html',
})
export class AffiliateMasterDetailComponent implements OnInit {
  affiliates: Affiliate[] = [];
  affiliateMaster: AffiliateMaster | null = null;
  chartData!: ChartClosureData;
  chartOverviewData: ChartOverviewData | null = null;
  overviewTerminalData: OverviewTerminals | null = null;
  formattedDateRange!: string;
  closureDataChartFormattedDateRange: string = '';
  globalCurrentSortBy: string = LAST_MONTH_SORT;
  resetDefaultSort: boolean = false;

  affiliateClosure!: AffiliateClosure[];
  pageAfflClosure: number = 1;
  limitAfflClosure: number = 5;
  totalAfflClosure: number = 0;
  orderAfflClosure: string = 'DESC';
  sortAfflClosure: string = 'TotalAmountGross';
  customTopAffiliateRangeActive: boolean = false;
  showErrorModal: boolean = false;
  startDate: string = '';
  endDate: string = '';

  customRangeChartActive: boolean = false;

  breadCrumbItems!: Array<{}>;
  order: string = 'ASC';
  sort: string = 'name';
  page: number = 1;
  limit: number = 5;
  total: number = 0;
  searchTerm: string = '';
  affiliateMasterSk: string;

  constructor(
    private route: ActivatedRoute,
    private affiliateService: AffiliateService,
    private merchantService: MerchantService,
    private affiliateMasterService: AffiliateMasterService,
    private terminalService: TerminalService,
    private dateRangeService: DateRangeService,
    private factService: FactClosureService
  ) {
    // Obtener el parámetro 'sk' de la URL y asegurar que no es nulo
    const affiliateSK = this.route.snapshot.paramMap.get('sk');
    if (!affiliateSK) {
      throw new Error('AffiliateMasterSK is required');
    }
    this.affiliateMasterSk = affiliateSK;
  }

  ngOnInit(): void {
    this.initializeBreadcrumb();
    this.initializeData();
  }

  private initializeBreadcrumb(): void {
    this.breadCrumbItems = [
      { label: 'Insta Comercio' },
      { label: 'Commerce', active: true },
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
    this.fetchAffiliates();
    this.fetchAfflMaster();
    this.fetchDataChartOverview();
    this.fetchTotalsByAffiliatesUnderMaster();
    this.fetchOverviewTerminals();
  }

  fetchAfflMaster(): void {
    this.affiliateMasterService
      .getAffiliateMaster(this.affiliateMasterSk)
      .subscribe((data: AffiliateMaster) => {
        this.affiliateMaster = data;
      });
  }

  onSortTopAffiliateByChange(sortBy: string): void {
    this.customTopAffiliateRangeActive = false;
    this.resetDefaultSort = false;
    this.updateDateRange(sortBy);
    this.fetchTotalsByAffiliatesUnderMaster();
  }

  fetchAffiliates(): void {
    this.affiliateService
      .getAffiliatesByAfflMaster(
        this.affiliateMasterSk,
        this.page,
        this.limit,
        this.sort,
        this.order,
        this.searchTerm
      )
      .subscribe((data: AffiliateList) => {
        this.affiliates = data.data;
        this.total = data.metadata.total;
        this.page = data.metadata.page;
      });
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.fetchAffiliates();
  }

  onPageAfflChange(newPage: number): void {
    this.pageAfflClosure = newPage;
    this.fetchTotalsByAffiliatesUnderMaster();
  }

  private fetchDataChartOverview(): void {
    this.merchantService
      .getAmountDayAffiliateMasterBetweenTwoDates(
        this.startDate,
        this.endDate,
        this.affiliateMasterSk
      )
      .subscribe({
        next: (data) => (this.chartData = data),
        error: (error) => this.handleError(error),
        complete: () => console.log('Fetching complete'),
      });

    this.merchantService
      .getAmountAffiliateMasterBetweenTwoDates(
        this.startDate,
        this.endDate,
        this.affiliateMasterSk
      )
      .subscribe({
        next: (data) => (this.chartOverviewData = data),
        error: (error) => this.handleError(error),
        complete: () => console.log('Fetching complete'),
      });
  }

  private fetchOverviewTerminals(): void {
    this.terminalService
      .getOverviewAffiliateMasterTerminals(this.affiliateMasterSk)
      .subscribe({
        next: (data) => (this.overviewTerminalData = data),
        error: (error) => this.handleError(error),
        complete: () => console.log('Fetching complete'),
      });
  }

  private fetchTotalsByAffiliatesUnderMaster(): void {
    this.factService
      .getTotalsByAffiliatesUnderMaster(
        this.affiliateMasterSk,
        this.startDate,
        this.endDate,
        this.limitAfflClosure,
        this.pageAfflClosure,
        this.sortAfflClosure,
        this.orderAfflClosure
      )
      .subscribe({
        next: (data) => {
          console.log(data.affiliatesClosures);
          this.affiliateClosure = data.affiliatesClosures;
          this.totalAfflClosure = data.metadata.total;
          this.pageAfflClosure = data.metadata.page;
        },
        error: (error) => this.handleError(error),
        complete: () => console.log('Fetching complete'),
      });
  }

  private handleError(error: any): void {
    console.error('An error occurred:', error);
    this.showErrorModal = true;
  }

  receiveSortOrder(sortOrder: any): void {
    this.sort = sortOrder.sort;
    this.order = sortOrder.order;
    this.fetchAffiliates();
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.page = 1; // Reset to first page
    this.fetchAffiliates();
  }

  onSortByChange(sortBy: string): void {
    this.customRangeChartActive = false;
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
    this.initializeData();
    this.resetDefaultSort = true;
    this.customRangeChartActive = false;
    this.customTopAffiliateRangeActive = false;
  }

  handleDateRange(dateRange: string): void {
    this.customRangeChartActive = true;
    this.customTopAffiliateRangeActive = true;
    this.closureDataChartFormattedDateRange = '';

    const [startDate, endDate] = dateRange.split(' to ');

    this.startDate = startDate;
    this.endDate = endDate;

    this.formattedDateRange = this.dateRangeService.getSpanishDateRange(
      startDate,
      endDate
    );

    this.fetchDataChartOverview();
    this.fetchTotalsByAffiliatesUnderMaster();
  }

  closeModal(): void {
    this.showErrorModal = false;
  }
}
