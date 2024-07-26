import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ChartClosureData,
  ChartOverviewData,
} from '@commerce/application/interfaces/chart.interface';
import { OverviewTerminals } from '@commerce/application/interfaces/overview-terminals.interface';
import { MerchantService } from '@commerce/application/services/data-merchant.service';
import { TerminalList } from '@core/interfaces/terminals-list.interface';
import { Affiliate } from '@core/models/affiliate.model';
import { Closure } from '@core/models/closure.model';
import { Terminal } from '@core/models/terminal.model';
import { CUSTOM_SORT, MONTHLY_SORT } from '@core/utils/constants';
import { AffiliateService } from '@services/affiliate.service';
import { DateRangeService } from '@services/date-range.service';
import { FactClosureService } from '@services/fact-closure.service';
import { TerminalService } from '@services/terminal.service';

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
  customRangeChartActive: boolean = false;

  affiliateSK: string;

  breadCrumbItems: Array<{}> = [
    { label: 'Insta Comercio' },
    { label: 'Afiliados' },
    { label: 'Detalle', active: true },
  ];

  constructor(
    private route: ActivatedRoute,
    private affiliateService: AffiliateService,
    private terminalService: TerminalService,
    private merchantService: MerchantService,
    private factClosureService: FactClosureService,
    private dateRangeService: DateRangeService
  ) {
    // Obtener el parámetro 'sk' de la URL y asegurar que no es nulo
    const affiliateSK = this.route.snapshot.paramMap.get('sk');
    if (!affiliateSK) {
      throw new Error('AffiliateSK is required');
    }
    this.affiliateSK = affiliateSK;
  }

  ngOnInit(): void {
    this.fetchAffiliate();
    this.fetchAffiliateTerminal();
    this.fetchOverviewTerminals();
    const { startDate, endDate } =
      this.dateRangeService.getDateRange(MONTHLY_SORT);
    this.fetchDataChartOverview(startDate, endDate, this.affiliateSK);
    this.fetchClosuresAffiliate();
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
    this.terminalService
      .getOverviewAffiliateTerminals(this.affiliateSK)
      .subscribe({
        next: (data) => (this.overviewTerminalData = data),
        error: (error) => console.error('Error fetching overview data', error),
        complete: () => console.log('Fetching complete'),
      });
  }

  private fetchDataChartOverview(
    startDate: string,
    endDate: string,
    affiliateSK: string
  ): void {
    this.merchantService
      .getAmountDayAffiliateBetweenTwoDates(startDate, endDate, affiliateSK)
      .subscribe({
        next: (data) => (this.chartData = data),
        error: (error) => console.error('Error fetching chart data', error),
        complete: () => console.log('Fetching complete'),
      });

    this.merchantService
      .getAmountAffiliateBetweenTwoDates(startDate, endDate, affiliateSK)
      .subscribe({
        next: (data) => (this.chartOverviewData = data),
        error: (error) =>
          console.error('Error fetching chart overview data', error),
        complete: () => console.log('Fetching complete'),
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
        error: (error) => console.error('Error fetching data', error),
        complete: () => console.log('Fetching complete'),
      });
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
    if (sortBy === CUSTOM_SORT) {
      this.customRangeChartActive = true;
      return;
    } else {
      this.customRangeChartActive = false;
    }

    const { startDate, endDate } = this.dateRangeService.getDateRange(sortBy);
    this.fetchDataChartOverview(startDate, endDate, this.affiliateSK);
  }

  handleDateRange(dateRange: string): void {
    const [startDate, endDate] = dateRange.split(' to ');
    this.fetchDataChartOverview(startDate, endDate, this.affiliateSK);
  }
}
