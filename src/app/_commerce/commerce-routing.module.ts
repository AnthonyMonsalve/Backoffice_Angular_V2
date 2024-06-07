import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SummaryCommerceComponent } from './presentations/pages/summary/summary.component';

const routes: Routes = [
  {
    path: 'summary',
    title: 'Summary Commerce',
    component: SummaryCommerceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommerceRoutingModule {}
