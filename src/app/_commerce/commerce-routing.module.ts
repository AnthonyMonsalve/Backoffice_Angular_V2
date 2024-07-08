import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AffiliateListComponent } from './presentations/pages/affiliate-list/affiliate-list.component';
import { CommerceListComponent } from './presentations/pages/commerce-list/commerce-list.component';
import { SummaryCommerceComponent } from './presentations/pages/summary/summary.component';
import { AffiliateDetailComponent } from './presentations/pages/affiliate-detail/affiliate-detail.component';
import { AffiliateMasterDetailComponent } from './presentations/pages/commerce-detail/commerce-detail.component';

const routes: Routes = [
  {
    path: 'summary',
    title: 'Summary Commerce',
    component: SummaryCommerceComponent,
  },
  {
    path: 'commerces-list',
    title: 'Commerces List',
    component: CommerceListComponent,
  },
  {
    path: 'affiliates-list',
    title: 'Affiliate List',
    component: AffiliateListComponent,
  },
  {
    path: 'affiliate-detail/:sk',
    title: 'Affiliate Detail',
    component: AffiliateDetailComponent,
  },
  {
    path: 'commerce-detail/:sk',
    title: 'Commerce Detail',
    component: AffiliateMasterDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommerceRoutingModule {}
