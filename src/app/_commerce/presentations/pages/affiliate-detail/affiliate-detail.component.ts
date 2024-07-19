import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ChartData,
  ChartOverviewData,
} from '@commerce/application/interfaces/chart.interface';
import { OverviewTerminals } from '@commerce/application/interfaces/overview-terminals.interface';
import { MerchantService } from '@commerce/application/services/data-merchant.service';
import { TerminalList } from '@core/interfaces/terminals-list.interface';
import { Terminal } from '@core/models/terminal.model';
import { AffiliateService } from '@services/affiliate.service';
import { TerminalService } from '@services/terminal.service';
import { Affiliate } from 'src/app/_commerce/domain/models/affiliate.model';

@Component({
  selector: 'app-affiliate-detail',
  templateUrl: './affiliate-detail.component.html',
})
export class AffiliateDetailComponent implements OnInit {
  affiliate: Affiliate | null = null;
  terminals: Terminal[] = [];
  overviewTerminalData: OverviewTerminals | null = null;
  chartData!: ChartData;
  chartOverviewData: ChartOverviewData | null = null;
  limitPageTerminals = 9;
  pageTerminals = 1;
  totalTerminals = 0;

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
    private merchantService: MerchantService
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
    this.fetchDataChartOverview('2022-05-15', '2022-06-15', this.affiliateSK);
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
}
