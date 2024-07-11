import { Component, OnInit } from '@angular/core';
import { OverviewTerminals } from '@commerce/application/interfaces/overview-terminals.interface';
import { ChartTerminalStatusService } from '@commerce/application/services/chart-terminal-status.service';
import { MerchantService } from 'src/app/_commerce/application/services/data-merchant.service';

@Component({
  selector: 'app-summary-commerce-dashboard',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryCommerceComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  overviewTerminalData: OverviewTerminals | null = null;

  totalAffiliatesMaster: number = 0; // Inicializa la variable aquí
  totalAffiliates: number = 0; // Inicializa la variable aquí

  constructor(
    private merchantService: MerchantService,
    private chartTerminalStatusService: ChartTerminalStatusService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Insta Comercio' },
      { label: 'Summary', active: true },
    ];
    this.fetchAffiliatesMasterData();
    this.fetchAffiliateData();
    this.fetchOverviewTerminals();
  }

  private fetchAffiliatesMasterData(): void {
    this.merchantService.getListAffiliatesMaster().subscribe(
      (data) => {
        this.totalAffiliatesMaster = data.metadata.total; // Asigna el valor recibido a la variable
      },
      (error) => {
        console.error('Error fetching affiliates data', error);
        // Considera manejar el error mostrando un mensaje al usuario
      }
    );
  }

  private fetchAffiliateData(): void {
    this.merchantService.getListAffiliates().subscribe(
      (data) => {
        this.totalAffiliates = data.metadata.total; // Asigna el valor recibido a la variable
      },
      (error) => {
        console.error('Error fetching affiliates data', error);
        // Considera manejar el error mostrando un mensaje al usuario
      }
    );
  }

  private fetchOverviewTerminals(): void {
    const search = 'Merchant';
    this.chartTerminalStatusService.getOverviewTerminals(search).subscribe({
      next: (data) => (this.overviewTerminalData = data),
      error: (error) => console.error('Error fetching overview data', error),
      complete: () => console.log('Fetching complete'),
    });
  }
}
