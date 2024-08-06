import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AffiliateDetailInstapagoComponent } from './presentations/pages/commerce-detail/commerce-detail.component';
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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {}
