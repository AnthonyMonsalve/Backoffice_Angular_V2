import { Component, OnInit } from '@angular/core';
import { MerchantService } from '@services/data-merchant.service';

@Component({
  selector: 'card-count-affiliates',
  templateUrl: './card-count-affiliates.component.html',
})
export class CardCountComponent implements OnInit {
  totalAffiliatesMaster: number = 0; // Aquí deberías tener la lógica para obtener este valor dinámicamente

  constructor(private merchantService: MerchantService) {}

  ngOnInit(): void {
    this.fetchChartData();
  }

  private fetchChartData(): void {
    this.merchantService.getListAffiliatesMaster().subscribe(
      (data) => {
        this.updateChartData(data);
      },
      (error) => {
        console.error('Error fetching chart data', error);
        // Podrías mostrar un mensaje de error al usuario aquí
      }
    );
  }

  private updateChartData(data: any): void {
    this.totalAffiliatesMaster = data.count;
  }
}
