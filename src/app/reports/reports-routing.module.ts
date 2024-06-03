import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardReportComponent } from './presentations/pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    title: 'Dashboard Report',
    component: DashboardReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
