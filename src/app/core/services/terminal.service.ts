import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OverviewTerminals } from '@commerce/application/interfaces/overview-terminals.interface';
import { checkToken } from '@core/helpers/jwt.interceptor';
import { TerminalList } from '@core/interfaces/terminals-list.interface';
import { environment_dev } from '@environments/environment.dev';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TerminalService {
  apiUrl = environment_dev.API_URL;

  constructor(private http: HttpClient) {}

  getTerminalsByAffiliate(
    affiliateSK: string | null = null
  ): Observable<TerminalList> {
    return this.http.get<TerminalList>(
      `${this.apiUrl}/api/terminals/affiliate/${affiliateSK}`,
      {
        context: checkToken(),
      }
    );
  }

  getOverviewTerminals(search?: string): Observable<OverviewTerminals> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<OverviewTerminals>(
      `${this.apiUrl}/api/terminal-states/overview`,
      {
        context: checkToken(),
        params,
      }
    );
  }

  getOverviewAffiliateTerminals(
    affiliateSK: string | null = null
  ): Observable<OverviewTerminals> {
    return this.http.get<OverviewTerminals>(
      `${this.apiUrl}/api/terminal-states/terminal-state-affiliate/${affiliateSK}`,
      {
        context: checkToken(),
      }
    );
  }
}
