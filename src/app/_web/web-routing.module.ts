import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SummaryWebComponent } from './presentations/pages/summary/summary.component';

const routes: Routes = [
  {
    path: 'summary',
    title: 'Summary Web',
    component: SummaryWebComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {}
