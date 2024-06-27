import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartData, ChartOverviewData } from '../interfaces/chart.interface';
import { MerchantService } from './data-merchant.service';

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  constructor(private merchantService: MerchantService) {}

  fetchChartData(dateIni: string, dateEnd: string): Observable<ChartData> {
    return this.merchantService.getAmountDayBetweenTwoDates(dateIni, dateEnd);
  }

  fetchChartOverviewData(
    dateIni: string,
    dateEnd: string
  ): Observable<ChartOverviewData> {
    return this.merchantService.getAmountBetweenTwoDates(dateIni, dateEnd);
  }
}
