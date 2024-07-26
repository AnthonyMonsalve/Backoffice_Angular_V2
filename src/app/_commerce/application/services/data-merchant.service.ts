// chart-data.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { checkToken } from '@core/helpers/jwt.interceptor';
import { AffiliateList } from '@core/interfaces/affiliate-list.interface';
import { environment_dev } from '@environments/environment.dev';
import { FactClosureService } from '@services/fact-closure.service';
import { Observable } from 'rxjs';
import { AffiliateMasterList } from '../interfaces/affiliate-master-list.interface';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  apiUrl = environment_dev.API_URL;

  constructor(
    private http: HttpClient,
    private factClosureService: FactClosureService
  ) {}

  getListAffiliatesMaster(
    page: number = 1,
    limit: number = 10,
    sort: string = 'nombreComercial',
    order: string = 'ASC',
    where: string = ''
  ): Observable<AffiliateMasterList> {
    const params = new HttpParams()
      .set('search', 'Merchant')
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

  getListAffiliates(
    page: number = 1,
    limit: number = 10,
    sort: string = 'nombreComercial',
    order: string = 'ASC',
    where: string = ''
  ): Observable<AffiliateList> {
    const params = new HttpParams()
      .set('search', 'Merchant')
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

  // Nuevo método para obtener la cantidad diaria entre dos fechas
  getAmountDayBetweenTwoDates(
    startDate: string,
    endDate: string
  ): Observable<any> {
    return this.factClosureService.getAmountDayBetweenTwoDates(
      startDate,
      endDate,
      'Merchant'
    );
  }

  // Nuevo método para obtener la cantidad diaria entre dos fechas
  getAmountDayAffiliateBetweenTwoDates(
    startDate: string,
    endDate: string,
    affiliateSK: string
  ): Observable<any> {
    return this.factClosureService.getAmountDayAffiliateBetweenTwoDates(
      startDate,
      endDate,
      affiliateSK
    );
  }

  // Nuevo método para obtener la cantidad diaria entre dos fechas
  getAmountDayAffiliateMasterBetweenTwoDates(
    startDate: string,
    endDate: string,
    affiliateMasterSK: string
  ): Observable<any> {
    return this.factClosureService.getAmountDayAffiliateMasterBetweenTwoDates(
      startDate,
      endDate,
      affiliateMasterSK
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

  getBanksAmountBetweenTwoDates(
    startDate: string,
    endDate: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('origen', 'Merchant');

    return this.http.get(
      `${this.apiUrl}/api/closures/date-range-banks-amount`,
      {
        context: checkToken(),
        params,
      }
    );
  }

  getAmountAffiliateBetweenTwoDates(
    startDate: string,
    endDate: string,
    affiliateSK: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get(
      `${this.apiUrl}/api/closures/date-range-amount/affiliate/${affiliateSK}`,
      {
        context: checkToken(),
        params,
      }
    );
  }

  getAmountAffiliateMasterBetweenTwoDates(
    startDate: string,
    endDate: string,
    affiliateMasterSK: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get(
      `${this.apiUrl}/api/closures/date-range-amount/affiliate-master/${affiliateMasterSK}`,
      {
        context: checkToken(),
        params,
      }
    );
  }
}
