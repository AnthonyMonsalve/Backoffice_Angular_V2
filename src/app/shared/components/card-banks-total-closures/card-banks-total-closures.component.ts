import { Component, Input, SimpleChanges } from '@angular/core';
import { BankClosure } from '@core/interfaces/bank-closures.interface';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'card-banks-total-closures',
  templateUrl: './card-banks-total-closures.component.html',
})
export class cardBanksTotalClosuresComponent {
  @Input() isLoading: boolean = true;
  @Input() bankClosure!: BankClosure[];
  totalAmountGrossAllBanks: number = 0;

  showLoad: boolean = true;

  constructor(private utilService: UtilsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isLoading']) {
      this.showLoad = true;
      if (!this.isLoading) {
        this.showLoad = false;
      }
    }

    if (changes['bankClosure'] && this.bankClosure) {
      this.totalAmountGrossAllBanks = this.bankClosure.reduce(
        (total, closure) => {
          return total + (closure.TotalAmountGross || 0);
        },
        0
      ); //sumar y asignar
    }
  }
}
