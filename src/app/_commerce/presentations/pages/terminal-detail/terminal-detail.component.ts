import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Closure } from '@core/models/closure.model';
import { Affiliate } from '@core/models/affiliate.model';
import { Terminal } from '@core/models/terminal.model';
import { FactClosureService } from '@services/fact-closure.service';
import { AffiliateService } from '@services/affiliate.service';
import { TerminalService } from '@services/terminal.service';

@Component({
  selector: 'app-terminal-detail',
  templateUrl: './terminal-detail.component.html',
})
export class TerminalDetailComponent implements OnInit {
  affiliate: Affiliate | null = null;
  terminal: Terminal | null = null;
  factClosures: Closure[] = [];
  limitPageClosures = 10;
  pageClosures = 1;
  totalClosures = 0;
  sortClosures = 'TimeId';
  orderClosures = 'DESC';

  terminalSK!: string;
  affiliateSK!: string;

  breadCrumbItems: Array<{}> = [
    { label: 'Insta Comercio' },
    { label: 'Afiliados' },
    { label: 'Terminal' },
    { label: 'Detalle', active: true },
  ];

  constructor(
    private route: ActivatedRoute,
    private factClosureService: FactClosureService,
    private affiliateService: AffiliateService,
    private terminalService: TerminalService
  ) {
     // Obtener el parámetro 'sk' de la URL y asegurar que no es nulo
     const terminalSK = this.route.snapshot.paramMap.get('terminalSK');
     if (!terminalSK) {
       throw new Error('terminalSK is required');
     }
     this.terminalSK = terminalSK;
     console.log(terminalSK, 'terminal');

     // Obtener el parámetro 'sk' de la URL y asegurar que no es nulo
     const affiliateSK = this.route.snapshot.paramMap.get('affiliateSK');
     if (!affiliateSK) {
       throw new Error('affiliateSK is required');
     }
     this.affiliateSK = affiliateSK;

     console.log(affiliateSK, 'affiliate');
  }

  ngOnInit(): void {
    this.fetchDataTerminalDetail();
    this.fetchAffiliate();
    this.fetchTerminal();
  }

  fetchDataTerminalDetail(): void {
    if (!this.terminalSK) return;

    this.factClosureService
      .getClosuresByTerminalSK(
        this.terminalSK,
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
    this.fetchDataTerminalDetail();
  }

  onPageChange(newPage: number): void {
    this.pageClosures = newPage;
    this.fetchDataTerminalDetail();
  }

  onLimitChange(newLimit: number): void {
    this.limitPageClosures = newLimit;
    this.pageClosures = 1; // Reset to first page
    this.fetchDataTerminalDetail();
  }

  fetchAffiliate(): void {
    this.affiliateService
      .getAffiliate(this.affiliateSK)
      .subscribe((affiliate: Affiliate) => {
        this.affiliate = affiliate;
      });
  }

  fetchTerminal(): void {
    this.terminalService
      .getOneTerminal(this.terminalSK)
      .subscribe((terminal: Terminal) => {
        this.terminal = terminal;
      });
  }
}
