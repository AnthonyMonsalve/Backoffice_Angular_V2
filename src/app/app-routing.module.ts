import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

import { LayoutComponent } from './shared/layouts/layout.component';
import { Basic404Component } from './shared/pages/basic404/basic404.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/reports/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'reports',
    component: LayoutComponent,
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: '**',
    component: Basic404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
