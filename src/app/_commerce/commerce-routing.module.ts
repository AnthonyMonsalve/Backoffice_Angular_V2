import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AffiliateDetailComponent } from './presentations/pages/affiliate-detail/affiliate-detail.component';
import { AffiliateListComponent } from './presentations/pages/affiliate-list/affiliate-list.component';
import { CommerceListComponent } from './presentations/pages/commerce-list/commerce-list.component';
import { SummaryCommerceComponent } from './presentations/pages/summary/summary.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommerceRoutingModule {}
