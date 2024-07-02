import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommerceRoutingModule {}
