import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SummaryPosComponent } from './presentations/pages/summary/summary.component';

const routes: Routes = [
  {
    path: 'summary',
    title: 'Summary Pos',
    component: SummaryPosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosRoutingModule {}
