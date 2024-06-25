import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';

// slider
import { FormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../shared/shared.module';
import { CommerceRoutingModule } from './commerce-routing.module';
import { CardCountComponent } from './presentations/components/card-count-affiliates/card-count-affiliates.components';
import { TerminalsStatusOverview } from './presentations/components/terminals-status-overview/terminals-status-overview.component';

import { SummaryCommerceComponent } from './presentations/pages/summary/summary.component';

@NgModule({
  declarations: [
    SummaryCommerceComponent,
    TerminalsStatusOverview,
    CardCountComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommerceRoutingModule,
    NgApexchartsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
  ],
  providers: [DecimalPipe],
})
export class CommerceModule {}
