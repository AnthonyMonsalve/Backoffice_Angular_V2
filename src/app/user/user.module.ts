import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';

// slider
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UserRoutingModule } from './user-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { PasswordUpdateFormComponent } from './presentations/components/password-update-form/password-update.component';
import { ProfileUpdateFormComponent } from './presentations/components/profile-update-form/profile-update.component';
import { UserActionsComponent } from './presentations/components/user-actions/user-actions.component';
import { ProfileComponent } from './presentations/pages/profile/profile.component';
import { UserListComponent } from './presentations/pages/user-list/user-list.component';
import { UserSettingsComponent } from './presentations/pages/user-settings/user-settings.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UserListComponent,
    ProfileUpdateFormComponent,
    PasswordUpdateFormComponent,
    UserActionsComponent,
    UserSettingsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    NgApexchartsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
  ],
  providers: [DecimalPipe],
})
export class UserModule {}
