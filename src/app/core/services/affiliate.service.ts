import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@core/helpers/jwt.interceptor';
import { AffiliateList } from '@core/interfaces/affiliate-list.interface';
import { Affiliate } from '@core/models/affiliate.model';
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
    order: string = 'ASC',
    where: string = ''
  ): Observable<AffiliateList> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('sort', sort)
      .set('order', order)
      .set('where', where);
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

  getListAffiliates(
    values: {
      page?: number;
      limit?: number;
      sort?: string;
      order?: string;
      where?: string;
      search?: string;
    } = {}
  ): Observable<AffiliateList> {
    const {
      page = 1,
      limit = 10,
      sort = 'nombreComercial',
      order = 'ASC',
      where = '',
      search = '',
    } = values;

    const params = new HttpParams()
      .set('search', search)
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sort', sort)
      .set('order', order)
      .set('where', where);
    return this.http.get<AffiliateList>(`${this.apiUrl}/api/affiliates/list`, {
      context: checkToken(),
      params,
    });
  }
}
