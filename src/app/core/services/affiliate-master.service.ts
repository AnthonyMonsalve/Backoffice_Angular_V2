import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AffiliateMasterList } from '@commerce/application/interfaces/affiliate-master-list.interface';
import { checkToken } from '@core/helpers/jwt.interceptor';
import { AffiliateMaster } from '@core/models/affiliate-master.model';
import { environment_dev } from '@environments/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AffiliateMasterService {
  apiUrl = environment_dev.API_URL;

  constructor(private http: HttpClient) {}

  getAffiliateMaster(
    afflMasterSK: string | null = null
  ): Observable<AffiliateMaster> {
    return this.http.get<AffiliateMaster>(
      `${this.apiUrl}/api/affiliates-master/${afflMasterSK}`,
      {
        context: checkToken(),
      }
    );
  }

  getListAffiliatesMaster(
    values: {
      page?: number;
      limit?: number;
      sort?: string;
      order?: string;
      where?: string;
      search?: string;
    } = {}
  ): Observable<AffiliateMasterList> {
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
    return this.http.get<AffiliateMasterList>(
      `${this.apiUrl}/api/affiliates-master/list`,
      {
        context: checkToken(),
        params,
      }
    );
  }
}
