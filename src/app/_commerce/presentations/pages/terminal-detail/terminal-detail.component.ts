import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Closure } from '@core/models/closure.model';
import { Affiliate } from '@core/models/affiliate.model';
import { Terminal } from '@core/models/terminal.model';
import { FactClosureService } from '@services/fact-closure.service';

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

  terminalSK: string;

  breadCrumbItems: Array<{}> = [
    { label: 'Insta Comercio' },
    { label: 'Afiliados' },
    { label: 'Terminal' },
    { label: 'Detalle', active: true },
  ];

  constructor(
    private route: ActivatedRoute,
    private factClosureService: FactClosureService
  ) {
    // Obtener el parámetro 'sk' de la URL y asegurar que no es nulo
    const terminalSK = this.route.snapshot.paramMap.get('sk');
    if (!terminalSK) {
      throw new Error('terminalSK is required');
    }
    this.terminalSK = terminalSK;
  }

  ngOnInit(): void {
    this.fetchDataTerminalDetal();
  }

  fetchDataTerminalDetal(): void {
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
          (this.affiliate = data.affiliate),
          (this.terminal = data.terminal),
          (this.factClosures = data.data.closures),
          (this.totalClosures = data.data.metadata.total),
          (this.pageClosures = data.data.metadata.page)
        ),
        error: (error) => console.error('Error fetching data', error),
        complete: () => console.log('Fetching complete'),
      });
  }

  receiveSortOrder(sortOrder: any): void {
    this.sortClosures = sortOrder.sort;
    this.orderClosures = sortOrder.order;
    this.fetchDataTerminalDetal();
  }

  onPageChange(newPage: number): void {
    this.pageClosures = newPage;
    this.fetchDataTerminalDetal();
  }

  onLimitChange(newLimit: number): void {
    this.limitPageClosures = newLimit;
    this.pageClosures = 1; // Reset to first page
    this.fetchDataTerminalDetal();
  }
}
