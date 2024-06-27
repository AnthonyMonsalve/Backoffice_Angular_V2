import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Overview } from '../interfaces/overview.interface';
import { MerchantService } from './data-merchant.service';

@Injectable({
  providedIn: 'root',
})
export class ChartTerminalStatusService {
  constructor(private merchantService: MerchantService) {}

  getTerminalsStatusOverview(): Observable<Overview> {
    return this.merchantService.getOverviewTerminalsStatus();
  }
}
