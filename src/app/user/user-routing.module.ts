import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './presentations/pages/profile/profile.component';
import { UserListComponent } from './presentations/pages/user-list/user-list.component';

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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
