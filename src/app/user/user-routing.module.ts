import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '@core/guards/admin.guard';
import { ProfileComponent } from './presentations/pages/profile/profile.component';
import { UserListComponent } from './presentations/pages/user-list/user-list.component';
import { UserSettingsComponent } from './presentations/pages/user-settings/user-settings.component';

const routes: Routes = [
  {
    path: 'profile',
    title: 'User Profile',
    component: ProfileComponent,
  },
  {
    path: 'user-list',
    title: 'User List',
    component: UserListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'user-administration/:id',
    title: 'User Administration',
    component: UserSettingsComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
