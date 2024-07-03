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

  getListAffiliatesMaster(
    page: number = 1,
    limit: number = 10
  ): Observable<AffiliateMasterList> {
    const params = new HttpParams()
      .set('search', 'Merchant')
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<AffiliateMasterList>(
      `${this.apiUrl}/api/affiliates-master/list`,
      {
        context: checkToken(),
        params,
      }
    );
  }

  getListAffiliates(
    page: number = 1,
    limit: number = 10
  ): Observable<AffiliateList> {
    const params = new HttpParams()
      .set('search', 'Merchant')
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<AffiliateList>(`${this.apiUrl}/api/affiliates/list`, {
      context: checkToken(),
      params,
    });
  }

  // Nuevo método para obtener la cantidad diaria entre dos fechas
  getAmountDayBetweenTwoDates(
    startDate: string,
    endDate: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('origen', 'Merchant');

    return this.http.get(
      `${this.apiUrl}/api/closures/date-range-daily-amount`,
      {
        context: checkToken(),
        params,
      }
    );
  }

  getAmountBetweenTwoDates(
    startDate: string,
    endDate: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('origen', 'Merchant');

    return this.http.get(`${this.apiUrl}/api/closures/date-range-amount`, {
      context: checkToken(),
      params,
    });
  }
}
