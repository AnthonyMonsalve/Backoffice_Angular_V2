import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
