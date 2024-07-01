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
import { PasswordUpdateFormComponent } from './presentations/components/password-update-form/password-update.component';
import { ProfileUpdateFormComponent } from './presentations/components/profile-update-form/profile-update.component';
import { ProfileComponent } from './presentations/pages/profile/profile.component';
import { UserListComponent } from './presentations/pages/user-list/list.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UserListComponent,
    ProfileUpdateFormComponent,
    PasswordUpdateFormComponent,
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
  ],
  providers: [DecimalPipe],
})
export class UserModule {}
