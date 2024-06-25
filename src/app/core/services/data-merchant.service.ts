// chart-data.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment_dev } from '@environments/environment.dev';
import { Observable } from 'rxjs';
import { checkToken } from '../helpers/jwt.interceptor';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  apiUrl = environment_dev.API_URL;

  constructor(private http: HttpClient) {}

  getOverviewTerminalsStatus(): Observable<any> {
    const params = new HttpParams().set('origen', 'Merchant');
    return this.http.get<any>(`${this.apiUrl}/api/terminal-states/overview`, {
      context: checkToken(),
      params,
    });
  }

  getListAffiliatesMaster(): Observable<any> {
    const params = new HttpParams().set('origen', 'Merchant');
    return this.http.get<any>(`${this.apiUrl}/api/affiliates-master/list`, {
      context: checkToken(),
      params,
    });
  }
}
