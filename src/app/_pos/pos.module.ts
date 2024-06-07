import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// slider

import { SharedModule } from '../shared/shared.module';
import { PosRoutingModule } from './pos-routing.module';
import { SummaryPosComponent } from './presentations/pages/summary/summary.component';

@NgModule({
  declarations: [SummaryPosComponent],
  imports: [CommonModule, SharedModule, PosRoutingModule],
  providers: [],
})
export class PosModule {}
