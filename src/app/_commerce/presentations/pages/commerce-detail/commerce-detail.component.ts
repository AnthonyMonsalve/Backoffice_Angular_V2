import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ChartClosureData,
  ChartOverviewData,
} from '@commerce/application/interfaces/chart.interface';
import { AffiliateClosure } from '@core/interfaces/affiliate-closures.interface';
import { AffiliateList } from '@core/interfaces/affiliate-list.interface';
import { BankClosure } from '@core/interfaces/bank-closures.interface';
import { OverviewTerminals } from '@core/interfaces/overview-terminals.interface';
import { AffiliateMaster } from '@core/models/affiliate-master.model';
import { Affiliate } from '@core/models/affiliate.model';
import { AffiliateMasterService } from '@services/affiliate-master.service';
import { AffiliateService } from '@services/affiliate.service';
import { FactClosureService } from '@services/fact-closure.service';
import { GlobalStateService } from '@services/global-state.service';
import { TerminalService } from '@services/terminal.service';
import { DateRangeService } from '@services/utils/date-range.service';

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
  closureTopAffiliatesFormattedDateRange: string = '';
  globalCurrentSortBy!: string;
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

  bankClosure!: BankClosure[];

  customRangeChartActive: boolean = false;

  breadCrumbItems!: Array<{}>;
  order: string = 'ASC';
  sort: string = 'name';
  page: number = 1;
  limit: number = 5;
  total: number = 0;
  searchTerm: string = '';
  affiliateMasterSk: string;

  isLoadingTerminalData: boolean = false;
  isLoadingOverviewDatachart: boolean = false;
  isLoadingDatachart: boolean = false;
  isLoadingTotalBanks: boolean = false;
  isLoadingTopAffiliates: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private affiliateService: AffiliateService,
    private affiliateMasterService: AffiliateMasterService,
    private terminalService: TerminalService,
    private dateRangeService: DateRangeService,
    private factService: FactClosureService,
    private globalStateService: GlobalStateService
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
    this.fetchAffiliates();
    this.fetchAfflMaster();
    this.fetchDataChartOverview();
    this.fetchTotalsByAffiliatesUnderMaster();
    this.fetchOverviewTerminals();
    this.fetchTotalsByBanksUnderMaster();
  }

  fetchAfflMaster(): void {
    this.affiliateMasterService
      .getAffiliateMaster(this.affiliateMasterSk)
      .subscribe((data: AffiliateMaster) => {
        this.affiliateMaster = data;
      });
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
    this.isLoadingOverviewDatachart = true;
    this.isLoadingDatachart = true;

    this.factService
      .getAmountDayAffiliateMasterBetweenTwoDates(
        this.startDate,
        this.endDate,
        this.affiliateMasterSk
      )
      .subscribe({
        next: (data) => {
          this.chartData = data;
          this.isLoadingDatachart = false;
        },
        error: (error) => this.handleError(error),
        complete: () => console.log('Fetching complete'),
      });

    this.factService
      .getAmountAffiliateMasterBetweenTwoDates(
        this.startDate,
        this.endDate,
        this.affiliateMasterSk
      )
      .subscribe({
        next: (data) => {
          this.chartOverviewData = data;
          this.isLoadingOverviewDatachart = false;
        },
        error: (error) => this.handleError(error),
        complete: () => console.log('Fetching complete'),
      });
  }

  private fetchOverviewTerminals(): void {
    this.isLoadingTerminalData = true;
    this.terminalService
      .getOverviewAffiliateMasterTerminals(this.affiliateMasterSk)
      .subscribe({
        next: (data) => {
          this.overviewTerminalData = data;
          this.isLoadingTerminalData = false;
        },
        error: (error) => this.handleError(error),
        complete: () => console.log('Fetching complete'),
      });
  }

  private fetchTotalsByBanksUnderMaster(): void {
    this.isLoadingTotalBanks = true;
    this.factService
      .getTotalsByBanksUnderMaster(
        this.affiliateMasterSk,
        this.startDate,
        this.endDate,
        this.sortAfflClosure,
        this.orderAfflClosure
      )
      .subscribe({
        next: (data) => {
          this.bankClosure = data.banks;
          this.isLoadingTotalBanks = false;
        },
        error: (error) => this.handleError(error),
        complete: () => console.log('Fetching complete'),
      });
  }

  private fetchTotalsByAffiliatesUnderMaster(): void {
    this.isLoadingTopAffiliates = true;
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
          this.affiliateClosure = data.affiliatesClosures;
          this.totalAfflClosure = data.metadata.total;
          this.pageAfflClosure = data.metadata.page;
          this.isLoadingTopAffiliates = false;
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

  onSortTopAffiliateByChange(sortBy: string): void {
    this.customTopAffiliateRangeActive = false;
    this.resetDefaultSort = false;
    this.updateDateRange(sortBy);
    this.fetchTotalsByAffiliatesUnderMaster();
    this.closureTopAffiliatesFormattedDateRange =
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
    this.closureTopAffiliatesFormattedDateRange = '';

    const [startDate, endDate] = dateRange.split(' to ');

    this.startDate = startDate;
    this.endDate = endDate;

    this.formattedDateRange = this.dateRangeService.getSpanishDateRange(
      startDate,
      endDate
    );

    this.fetchDataChartOverview();
    this.fetchTotalsByAffiliatesUnderMaster();
    this.fetchTotalsByBanksUnderMaster();
  }

  closeModal(): void {
    this.showErrorModal = false;
  }
}
