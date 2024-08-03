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
import {
  CUSTOM_SORT,
  LAST_MONTH_SORT,
  MONTHLY_SORT,
  YEARLY_SORT,
} from '@core/utils/constants';
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
  stringDateRange!: string;

  affiliateClosure!: AffiliateClosure[];
  pageAfflClosure: number = 1;
  limitAfflClosure: number = 5;
  totalAfflClosure: number = 0;
  orderAfflClosure: string = 'DESC';
  sortAfflClosure: string = 'TotalAmountGross';
  customTopAffiliateRangeActive: boolean = false;
  startDateAffl!: string;
  endDateAffl!: string;

  customRangeChartActive: boolean = false;

  breadCrumbItems: Array<{}> = [
    { label: 'Insta Comercio' },
    { label: 'Listado de afiliados', active: true },
  ];
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
    this.fetchAffiliates();
    this.fetchAfflMaster();
    const { startDate, endDate } =
      this.dateRangeService.getDateRange(LAST_MONTH_SORT);

    this.stringDateRange = this.dateRangeService.getSpanishDateRange(
      startDate,
      endDate
    );

    this.startDateAffl = startDate;
    this.endDateAffl = endDate;

    this.fetchDataChartOverview(startDate, endDate, this.affiliateMasterSk);
    this.fetchTotalsByAffiliatesUnderMaster(startDate, endDate);
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
    const { startDate, endDate } = this.dateRangeService.getDateRange(sortBy);
    this.startDateAffl = startDate;
    this.endDateAffl = endDate;
    this.fetchTotalsByAffiliatesUnderMaster(startDate, endDate);
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
    this.fetchTotalsByAffiliatesUnderMaster(
      this.startDateAffl,
      this.endDateAffl
    );
  }

  private fetchDataChartOverview(
    startDate: string,
    endDate: string,
    affiliateMasterSK: string
  ): void {
    this.merchantService
      .getAmountDayAffiliateMasterBetweenTwoDates(
        startDate,
        endDate,
        affiliateMasterSK
      )
      .subscribe({
        next: (data) => (this.chartData = data),
        error: (error) => console.error('Error fetching chart data', error),
        complete: () => console.log('Fetching complete'),
      });

    this.merchantService
      .getAmountAffiliateMasterBetweenTwoDates(
        startDate,
        endDate,
        affiliateMasterSK
      )
      .subscribe({
        next: (data) => (this.chartOverviewData = data),
        error: (error) =>
          console.error('Error fetching chart overview data', error),
        complete: () => console.log('Fetching complete'),
      });
  }

  private fetchOverviewTerminals(): void {
    this.terminalService
      .getOverviewAffiliateMasterTerminals(this.affiliateMasterSk)
      .subscribe({
        next: (data) => (this.overviewTerminalData = data),
        error: (error) => console.error('Error fetching overview data', error),
        complete: () => console.log('Fetching complete'),
      });
  }

  private fetchTotalsByAffiliatesUnderMaster(
    startDate: string,
    endDate: string
  ): void {
    this.factService
      .getTotalsByAffiliatesUnderMaster(
        this.affiliateMasterSk,
        startDate,
        endDate,
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
        error: (error) => console.error('Error fetching overview data', error),
        complete: () => console.log('Fetching complete'),
      });
  }

  receiveSortOrder(sortOrder: any): void {
    this.sort = sortOrder.sort;
    this.order = sortOrder.order;
    console.log(sortOrder);
    this.fetchAffiliates();
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.page = 1; // Reset to first page
    this.fetchAffiliates();
  }

  onSortByChange(sortBy: string): void {
    this.customRangeChartActive = false;
    const { startDate, endDate } = this.dateRangeService.getDateRange(sortBy);
    this.fetchDataChartOverview(startDate, endDate, this.affiliateMasterSk);
  }

  handleDateRange(dateRange: string): void {
    this.customRangeChartActive = true;
    this.customTopAffiliateRangeActive = true;

    const [startDate, endDate] = dateRange.split(' to ');

    this.startDateAffl = startDate;
    this.endDateAffl = endDate;

    this.stringDateRange = this.dateRangeService.getSpanishDateRange(
      this.startDateAffl,
      this.endDateAffl
    );
    this.fetchDataChartOverview(startDate, endDate, this.affiliateMasterSk);
    this.fetchTotalsByAffiliatesUnderMaster(startDate, endDate);
  }
}
