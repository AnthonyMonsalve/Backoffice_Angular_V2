import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// slider

import { SharedModule } from '@shared/shared.module';
import { SummaryWebComponent } from './presentations/pages/summary/summary.component';
import { WebRoutingModule } from './web-routing.module';

@NgModule({
  declarations: [SummaryWebComponent],
  imports: [CommonModule, SharedModule, WebRoutingModule],
  providers: [],
})
export class WebModule {}
