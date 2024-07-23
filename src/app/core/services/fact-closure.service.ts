import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@core/helpers/jwt.interceptor';
import { environment_dev } from '@environments/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FactClosureService {
  apiUrl = environment_dev.API_URL;

  constructor(private http: HttpClient) {}

  // Nuevo método para obtener la cantidad diaria entre dos fechas
  getAmountDayBetweenTwoDates(
    startDate: string,
    endDate: string,
    origen: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('origen', origen);

    return this.http.get(
      `${this.apiUrl}/api/closures/date-range-daily-amount`,
      {
        context: checkToken(),
        params,
      }
    );
  }

  getAmountDayAffiliateBetweenTwoDates(
    startDate: string,
    endDate: string,
    affiliateSK: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get(
      `${this.apiUrl}/api/closures/date-range-daily-amount/affiliate/${affiliateSK}`,
      {
        context: checkToken(),
        params,
      }
    );
  }

  getAmountDayAffiliateMasterBetweenTwoDates(
    startDate: string,
    endDate: string,
    affiliateMasterSK: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get(
      `${this.apiUrl}/api/closures/date-range-daily-amount/affiliate-master/${affiliateMasterSK}`,
      {
        context: checkToken(),
        params,
      }
    );
  }

  getClosuresByTerminalSK(
    terminalSK: string | null = null,
    limit: number = 10,
    page: number = 1,
    sort: string = 'TimeId',
    order: string = 'DESC'
  ): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('sort', sort)
      .set('order', order);

    return this.http.get<any>(
      `${this.apiUrl}/api/closures-history/closures-terminal-sk/${terminalSK}`,
      {
        context: checkToken(),
        params,
      }
    );
  }

  getClosuresByAffiliateSK(
    affiliateSK: string | null = null,
    limit: number = 10,
    page: number = 1,
    sort: string = 'TimeId',
    order: string = 'DESC'
  ): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('sort', sort)
      .set('order', order);

    return this.http.get<any>(
      `${this.apiUrl}/api/closures-history/closures-affiliate-sk/${affiliateSK}`,
      {
        context: checkToken(),
        params,
      }
    );
  }
}
