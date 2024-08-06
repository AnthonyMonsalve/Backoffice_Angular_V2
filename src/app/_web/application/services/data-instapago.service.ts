// chart-data.service.ts
import { Injectable } from '@angular/core';
import { environment_dev } from '@environments/environment.dev';
import { FactClosureService } from '@services/fact-closure.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstapagoService {
  apiUrl = environment_dev.API_URL;

  constructor(private factClosureService: FactClosureService) {}

  // Nuevo método para obtener la cantidad diaria entre dos fechas
  getAmountDayBetweenTwoDates(
    startDate: string,
    endDate: string
  ): Observable<any> {
    return this.factClosureService.getAmountDayBetweenTwoDates(
      startDate,
      endDate,
      'Instapago'
    );
  }

  getAmountBetweenTwoDates(
    startDate: string,
    endDate: string
  ): Observable<any> {
    return this.factClosureService.getAmountBetweenTwoDates(
      startDate,
      endDate,
      'Instapago'
    );
  }

  getBanksAmountBetweenTwoDates(
    startDate: string,
    endDate: string
  ): Observable<any> {
    return this.factClosureService.getBanksAmountBetweenTwoDates(
      startDate,
      endDate,
      'Instapago'
    );
  }
}
