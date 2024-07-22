import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ChartData,
  ChartOverviewData,
} from '@commerce/application/interfaces/chart.interface';
import { OverviewTerminals } from '@commerce/application/interfaces/overview-terminals.interface';
import { MerchantService } from '@commerce/application/services/data-merchant.service';
import { AffiliateMaster } from '@core/models/affiliate-master.model';
import { AffiliateList } from '@core/interfaces/affiliate-list.interface';
import { AffiliateMasterService } from '@services/affiliate-master.service';
import { AffiliateService } from '@services/affiliate.service';
import { TerminalService } from '@services/terminal.service';
import { Affiliate } from '@core/models/affiliate.model';

@Component({
  selector: 'app-affiliate-master-detail',
  templateUrl: './commerce-detail.component.html',
})
export class AffiliateMasterDetailComponent implements OnInit {
  affiliates: Affiliate[] = [];
  affiliateMaster: AffiliateMaster | null = null;
  chartData!: ChartData;
  chartOverviewData: ChartOverviewData | null = null;
  overviewTerminalData: OverviewTerminals | null = null;

  breadCrumbItems: Array<{}> = [
    { label: 'Insta Comercio' },
    { label: 'Listado de afiliados', active: true },
  ];
  order: string = 'ASC';
  sort: string = 'name';
  page: number = 1;
  limit: number = 5;
  total: number = 0;
  affiliateMasterSk: string;

  constructor(
    private route: ActivatedRoute,
    private affiliateService: AffiliateService,
    private merchantService: MerchantService,
    private affiliateMasterService: AffiliateMasterService,
    private terminalService: TerminalService
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
    this.fetchDataChartOverview(
      '2022-05-15',
      '2022-06-15',
      this.affiliateMasterSk
    );
    this.fetchOverviewTerminals();
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
        this.order
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

  receiveSortOrder(sortOrder: any): void {
    this.sort = sortOrder.sort;
    this.order = sortOrder.order;
    console.log(sortOrder);
    this.fetchAffiliates();
  }
}
