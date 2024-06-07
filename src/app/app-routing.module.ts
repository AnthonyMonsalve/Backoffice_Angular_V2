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
    path: 'pos',
    component: LayoutComponent,
    loadChildren: () => import('./_pos/pos.module').then((m) => m.PosModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'web',
    component: LayoutComponent,
    loadChildren: () => import('./_web/web.module').then((m) => m.WebModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'commerce',
    component: LayoutComponent,
    loadChildren: () =>
      import('./_commerce/commerce.module').then((m) => m.CommerceModule),
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
