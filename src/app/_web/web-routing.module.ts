import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommerceExistenceGuard } from '@core/guards/commerce-existence.guard';
import { AffiliateDetailInstapagoComponent } from './presentations/pages/commerce-detail-web/commerce-detail.component';
import { CommerceListWebComponent } from './presentations/pages/commerce-list/commerce-list.component';
import { SummaryWebComponent } from './presentations/pages/summary-web/summary.component';

const routes: Routes = [
  {
    path: 'summary',
    title: 'Summary Web',
    component: SummaryWebComponent,
  },
  {
    path: 'commerces-list',
    title: 'Commerces List',
    component: CommerceListWebComponent,
  },
  {
    path: 'commerce-detail/:sk',
    title: 'Commerce Detail',
    component: AffiliateDetailInstapagoComponent,
    canActivate: [CommerceExistenceGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {}
