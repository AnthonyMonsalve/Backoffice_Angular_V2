// chart-data.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment_dev } from '@environments/environment.dev';
import { Observable } from 'rxjs';
import { checkToken } from '../../../core/helpers/jwt.interceptor';
import { AffiliateList } from '../interfaces/affiliate-list.interface';
import { AffiliateMasterList } from '../interfaces/affiliate-master-list.interface';
import { Overview } from '../interfaces/overview.interface';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  apiUrl = environment_dev.API_URL;

  constructor(private http: HttpClient) {}

  getOverviewTerminalsStatus(): Observable<Overview> {
    const params = new HttpParams().set('origen', 'Merchant');
    return this.http.get<Overview>(
      `${this.apiUrl}/api/terminal-states/overview`,
      {
        context: checkToken(),
        params,
      }
    );
  }

  getListAffiliatesMaster(): Observable<AffiliateMasterList> {
    const params = new HttpParams().set('origen', 'Merchant');
    return this.http.get<AffiliateMasterList>(
      `${this.apiUrl}/api/affiliates-master/list`,
      {
        context: checkToken(),
        params,
      }
    );
  }

  getListAffiliates(): Observable<AffiliateList> {
    const params = new HttpParams().set('origen', 'Merchant');
    return this.http.get<AffiliateList>(`${this.apiUrl}/api/affiliates/list`, {
      context: checkToken(),
      params,
    });
  }

  // Nuevo método para obtener la cantidad diaria entre dos fechas
  getAmountDayBetweenTwoDates(
    dateIni: string,
    dateEnd: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('dateIni', dateIni)
      .set('dateEnd', dateEnd);

    return this.http.get(
      `${this.apiUrl}/api/closures-merchant/amount-day-between-two-dates`,
      {
        context: checkToken(),
        params,
      }
    );
  }

  getAmountBetweenTwoDates(dateIni: string, dateEnd: string): Observable<any> {
    const params = new HttpParams()
      .set('dateIni', dateIni)
      .set('dateEnd', dateEnd);

    return this.http.get(
      `${this.apiUrl}/api/closures/total-amount-between-two-dates`,
      {
        context: checkToken(),
        params,
      }
    );
  }
}
