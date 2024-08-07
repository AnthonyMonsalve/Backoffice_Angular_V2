import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ChartClosureData,
  ChartOverviewData,
} from '@commerce/application/interfaces/chart.interface';
import { AffiliateList } from '@core/interfaces/affiliate-list.interface';
import { BankClosure } from '@core/interfaces/bank-closures.interface';
import { OverviewTerminals } from '@core/interfaces/overview-terminals.interface';
import { TerminalList } from '@core/interfaces/terminals-list.interface';
import { AffiliateMaster } from '@core/models/affiliate-master.model';
import { Affiliate } from '@core/models/affiliate.model';
import { Closure } from '@core/models/closure.model';
import { Terminal } from '@core/models/terminal.model';
import { LAST_MONTH_SORT } from '@core/utils/constants';
import { AffiliateMasterService } from '@services/affiliate-master.service';
import { AffiliateService } from '@services/affiliate.service';
import { FactClosureService } from '@services/fact-closure.service';
import { TerminalService } from '@services/terminal.service';
import { DateRangeService } from '@services/utils/date-range.service';

@Component({
  selector: 'app-affiliate-master-detail',
  templateUrl: './commerce-detail.component.html',
})
export class AffiliateDetailInstapagoComponent implements OnInit {
  affiliate: Affiliate | null = null;
  affiliateMaster: AffiliateMaster | null = null;
  chartData!: ChartClosureData;
  chartOverviewData: ChartOverviewData | null = null;
  overviewTerminalData: OverviewTerminals | null = null;
  formattedDateRange!: string;
  closureDataChartFormattedDateRange: string = '';
  globalCurrentSortBy: string = LAST_MONTH_SORT;
  resetDefaultSort: boolean = false;

  factClosures: Closure[] = [];

  orderAfflClosure: string = 'DESC';
  sortAfflClosure: string = 'TotalAmountGross';
  showErrorModal: boolean = false;
  startDate: string = '';
  endDate: string = '';

  limitPageClosures = 5;
  pageClosures = 1;
  totalClosures = 0;
  sortClosures = 'TimeId';
  orderClosures = 'DESC';

  bankClosure!: BankClosure[];

  customRangeChartActive: boolean = false;

  breadCrumbItems!: Array<{}>;
  total: number = 0;
  sort: string = 'name';
  order: string = 'ASC';
  searchTerm: string = '';
  affiliateMasterSk: string;

  terminals: Terminal[] = [];
  limitPageTerminals = 9;
  pageTerminals = 1;
  totalTerminals = 0;

  isLoadingTerminalData: boolean = false;
  isLoadingOverviewDatachart: boolean = false;
  isLoadingDatachart: boolean = false;
  isLoadingTotalBanks: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private affiliateService: AffiliateService,
    private affiliateMasterService: AffiliateMasterService,
    private terminalService: TerminalService,
    private dateRangeService: DateRangeService,
    private factClosureService: FactClosureService
  ) {
    // Obtener el parámetro 'sk' de la URL y asegurar que no es nulo
    const affiliateMasterSk = this.route.snapshot.paramMap.get('sk');
    if (!affiliateMasterSk) {
      throw new Error('AffiliateMasterSK is required');
    }
    this.affiliateMasterSk = affiliateMasterSk;
  }

  ngOnInit(): void {
    this.initializeBreadcrumb();

    const PAGE = 1;
    const LIMIT = 1;
    const SORT = 'name';
    const ORDER = 'ASC';

    this.affiliateService
      .getAffiliatesByAfflMaster(
        this.affiliateMasterSk,
        PAGE,
        LIMIT,
        SORT,
        ORDER,
        this.searchTerm
      )
      .subscribe({
        next: (data: AffiliateList) => {
          if (data.data.length > 0) {
            this.affiliate = data.data[0];
            this.initializeData();
          } else {
            // Manejar el caso de no datos: mostrar mensaje, redireccionar, etc.
            console.error('No affiliates found for the specified master.');
          }
        },
        error: (error) => this.handleError(error),
      });
  }

  private initializeBreadcrumb(): void {
    this.breadCrumbItems = [
      { label: 'Insta Comercio' },
      { label: 'Commerce', active: true },
    ];
  }

  private initializeData(): void {
    // this.startDate =
    //   this.dateRangeService.getDateRange(LAST_MONTH_SORT).startDate;
    // this.endDate = this.dateRangeService.getDateRange(LAST_MONTH_SORT).endDate;
    this.startDate = '2022-08-01';
    this.endDate = '2022-08-31';

    this.formattedDateRange = this.dateRangeService.getSpanishDateRange(
      this.startDate,
      this.endDate
    );
    this.fetchData();
  }

  private fetchData(): void {
    this.fetchAfflMaster();
    this.fetchDataChartOverview();
    this.fetchOverviewTerminals();
    this.fetchTotalsByBanksUnderMaster();
    this.fetchClosuresAffiliate();
    this.fetchAffiliateTerminal();
  }

  fetchAfflMaster(): void {
    this.affiliateMasterService
      .getAffiliateMaster(this.affiliateMasterSk)
      .subscribe((data: AffiliateMaster) => {
        this.affiliateMaster = data;
        if (this.affiliateMaster.address === null) {
          this.affiliateMaster.address = 'No tiene dirección asociada';
        }
        if (this.affiliateMaster.email === null) {
          this.affiliateMaster.email = 'No tiene email asociado';
        }
      });
  }

  fetchAffiliate(): void {
    const PAGE = 1;
    const LIMIT = 1;
    const SORT = 'name';
    const ORDER = 'ASC';

    this.affiliateService
      .getAffiliatesByAfflMaster(
        this.affiliateMasterSk,
        PAGE,
        LIMIT,
        SORT,
        ORDER,
        this.searchTerm
      )
      .subscribe((data: AffiliateList) => {
        this.affiliate = data.data[0];
      });
  }

  private fetchDataChartOverview(): void {
    this.isLoadingOverviewDatachart = true;
    this.isLoadingDatachart = true;

    this.factClosureService
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
      });

    this.factClosureService
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
      });
  }

  private fetchTotalsByBanksUnderMaster(): void {
    this.isLoadingTotalBanks = true;
    this.factClosureService
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
      });
  }

  private handleError(error: any): void {
    console.error('An error occurred:', error);
    this.showErrorModal = true;
  }

  receiveSortOrder(sortOrder: any): void {
    this.sort = sortOrder.sort;
    this.order = sortOrder.order;
    this.fetchAffiliate();
  }

  onPageClosureChange(newPage: number): void {
    this.pageClosures = newPage;
    this.fetchClosuresAffiliate();
  }

  fetchAffiliateTerminal(): void {
    this.terminalService
      .getTerminalsByAffiliate(
        this.affiliate?.affiliatesSK.toString(),
        this.limitPageTerminals,
        this.pageTerminals
      )
      .subscribe((terminals: TerminalList) => {
        this.terminals = terminals.data;
        this.totalTerminals = terminals.metadata.total; // Suponiendo que el servicio devuelve el total de terminales
      });
  }

  onPageChange(newPage: number): void {
    this.pageTerminals = newPage;
    this.fetchAffiliateTerminal();
  }

  onLimitClosureChange(newLimit: number): void {
    this.limitPageClosures = newLimit;
    this.pageClosures = 1; // Reset to first page
    this.fetchClosuresAffiliate();
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

  private fetchClosuresAffiliate(): void {
    if (!this.affiliate?.affiliatesSK) return;

    this.factClosureService
      .getClosuresByAffiliateSK(
        this.affiliate.affiliatesSK.toString(),
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
      });
  }

  resetCustomRangeSet(): void {
    this.initializeData();
    this.resetDefaultSort = true;
    this.customRangeChartActive = false;
  }

  handleDateRange(dateRange: string): void {
    this.customRangeChartActive = true;
    this.closureDataChartFormattedDateRange = '';

    const [startDate, endDate] = dateRange.split(' to ');

    this.startDate = startDate;
    this.endDate = endDate;

    this.formattedDateRange = this.dateRangeService.getSpanishDateRange(
      startDate,
      endDate
    );

    this.fetchDataChartOverview();
    this.fetchTotalsByBanksUnderMaster();
  }

  closeModal(): void {
    this.showErrorModal = false;
  }
}
