import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OverviewTerminals } from '@commerce/application/interfaces/overview-terminals.interface';
import { ChartTerminalStatusService } from '@commerce/application/services/chart-terminal-status.service';
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

  affiliateSK = this.route.snapshot.paramMap.get('sk');

  breadCrumbItems: Array<{}> = [
    { label: 'Insta Comercio' },
    { label: 'Afiliados' },
    { label: 'Detalle', active: true },
  ];

  constructor(
    private route: ActivatedRoute,
    private affiliateService: AffiliateService,
    private terminalService: TerminalService,
    private chartTerminalStatusService: ChartTerminalStatusService
  ) {}

  ngOnInit(): void {
    this.fetchAffiliate();
    this.fetchAffiliateTerminal();
    this.fetchOverviewTerminals();
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
      .getTerminalsByAffiliate(this.affiliateSK)
      .subscribe((terminals: TerminalList) => {
        this.terminals = terminals.data;
        console.log(this.terminals);
      });
  }

  private fetchOverviewTerminals(): void {
    const search = this.affiliateSK;
    if (!search) {
      return;
    }
    this.chartTerminalStatusService
      .getOverviewAffiliateTerminals(search)
      .subscribe({
        next: (data) => (this.overviewTerminalData = data),
        error: (error) => console.error('Error fetching overview data', error),
        complete: () => console.log('Fetching complete'),
      });
  }
}
