import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';

// slider
import { FormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommerceRoutingModule } from './commerce-routing.module';
import { CardCountComponent } from './presentations/components/card-count/card-count.component';
import { TerminalsStatusOverviewComponent } from './presentations/components/terminals-status-overview/terminals-status-overview.component';

import { ClosuresDataChartComponent } from './presentations/components/closures-data-chart/closures-data-chart.component';
import { AffiliateDetailComponent } from './presentations/pages/affiliate-detail/affiliate-detail.component';
import { AffiliateListComponent } from './presentations/pages/affiliate-list/affiliate-list.component';
import { CommerceListComponent } from './presentations/pages/commerce-list/commerce-list.component';
import { SummaryCommerceComponent } from './presentations/pages/summary/summary.component';
import { AffiliateMasterDetailComponent } from './presentations/pages/commerce-detail/commerce-detail.component';

@NgModule({
  declarations: [
    SummaryCommerceComponent,
    CommerceListComponent,
    AffiliateListComponent,
    AffiliateDetailComponent,
    AffiliateMasterDetailComponent,
    TerminalsStatusOverviewComponent,
    CardCountComponent,
    ClosuresDataChartComponent,
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
