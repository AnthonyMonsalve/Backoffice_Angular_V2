import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';

// slider
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './presentations/pages/profile/profile.component';

@NgModule({
  declarations: [ProfileComponent],
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
