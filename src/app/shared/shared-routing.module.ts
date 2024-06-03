import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Basic404Component } from './pages/basic404/basic404.component';

const routes: Routes = [
  {
    path: '**',
    component: Basic404Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
