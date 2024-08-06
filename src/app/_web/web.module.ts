import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// slider

import { FormsModule } from '@angular/forms';
import {
  NgbModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AffiliateDetailInstapagoComponent } from './presentations/pages/commerce-detail/commerce-detail.component';
import { CommerceListWebComponent } from './presentations/pages/commerce-list/commerce-list.component';
import { SummaryWebComponent } from './presentations/pages/summary-web/summary.component';
import { WebRoutingModule } from './web-routing.module';

@NgModule({
  declarations: [
    SummaryWebComponent,
    CommerceListWebComponent,
    AffiliateDetailInstapagoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    WebRoutingModule,
    NgApexchartsModule,
    CommonModule,
    SharedModule,
    NgApexchartsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    NgbModule,
    NgxSkeletonLoaderModule,
    FlatpickrModule.forRoot(),
  ],
  providers: [],
})
export class WebModule {}
