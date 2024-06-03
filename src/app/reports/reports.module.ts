import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NgbAccordionModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';

import { SimplebarAngularModule } from 'simplebar-angular';
// slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { SharedModule } from '../shared/shared.module';
import { ReportService } from './applications/services/report.service';
import { ReportImpRepository } from './infrastructures/repositories/report.imp.repository';
import { TerminalActivityComponent } from './presentations/components/terminal-activity/terminal-activity.component';
import { DashboardReportComponent } from './presentations/pages/dashboard/dashboard.component';
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
  declarations: [DashboardReportComponent, TerminalActivityComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule,
    NgbDropdownModule,
    SlickCarouselModule,
    SimplebarAngularModule,
    NgbAccordionModule,
  ],
  providers: [
    {
      provide: 'ReportRepeeositoryInterface',
      useClass: ReportImpRepository,
    },
    ReportService,
  ],
})
export class ReportsModule {}
