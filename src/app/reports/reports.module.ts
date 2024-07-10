import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NgbAccordionModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';

import { SimplebarAngularModule } from 'simplebar-angular';
// slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { SharedModule } from '@shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule,
    NgbDropdownModule,
    SlickCarouselModule,
    SimplebarAngularModule,
    NgbAccordionModule,
  ],
  providers: [],
})
export class ReportsModule {}
