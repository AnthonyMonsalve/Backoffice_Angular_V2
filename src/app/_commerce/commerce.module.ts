import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// slider

import { SharedModule } from '../shared/shared.module';
import { CommerceRoutingModule } from './commerce-routing.module';
import { SummaryCommerceComponent } from './presentations/pages/summary/summary.component';

@NgModule({
  declarations: [SummaryCommerceComponent],
  imports: [CommonModule, SharedModule, CommerceRoutingModule],
  providers: [],
})
export class CommerceModule {}
