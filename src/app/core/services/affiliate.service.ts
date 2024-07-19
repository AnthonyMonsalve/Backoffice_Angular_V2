import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Affiliate } from '@commerce/domain/models/affiliate.model';
import { checkToken } from '@core/helpers/jwt.interceptor';
import { AffiliateList } from '@core/interfaces/affiliate-list.interface';
import { environment_dev } from '@environments/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AffiliateService {
  apiUrl = environment_dev.API_URL;

  constructor(private http: HttpClient) {}

  getAffiliatesByAfflMaster(
    afflMasterSK: string | null = null,
    page: number = 1,
    limit: number = 10,
    sort: string = 'name',
    order: string = 'ASC'
  ): Observable<AffiliateList> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('sort', sort)
      .set('order', order);
    return this.http.get<AffiliateList>(
      `${this.apiUrl}/api/affiliates/master/${afflMasterSK}`,
      {
        context: checkToken(),
        params,
      }
    );
  }

  getAffiliate(afflMasterSK: string | null = null): Observable<Affiliate> {
    return this.http.get<Affiliate>(
      `${this.apiUrl}/api/affiliates/${afflMasterSK}`,
      {
        context: checkToken(),
      }
    );
  }
}
