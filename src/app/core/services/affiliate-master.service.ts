import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AffiliateMaster } from '@core/models/affiliate-master.model';
import { checkToken } from '@core/helpers/jwt.interceptor';
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
}
