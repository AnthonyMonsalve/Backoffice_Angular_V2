import { Injectable } from '@angular/core';
import { TerminalService } from '@services/terminal.service';
import { Observable } from 'rxjs';
import { OverviewTerminals } from '../interfaces/overview-terminals.interface';

@Injectable({
  providedIn: 'root',
})
export class ChartTerminalStatusService {
  constructor(private terminalService: TerminalService) {}

  getOverviewTerminals(search?: string): Observable<OverviewTerminals> {
    return this.terminalService.getOverviewTerminals(search);
  }

  getOverviewAffiliateTerminals(
    search?: string
  ): Observable<OverviewTerminals> {
    return this.terminalService.getOverviewAffiliateTerminals(search);
  }
}
