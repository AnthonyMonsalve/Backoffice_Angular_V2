import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BasicComponent } from './basic/basic.component';
import { ForgotpasswordRoutingModule } from './forgot-password-routing.module';

@NgModule({
  declarations: [BasicComponent],
  imports: [
    CommonModule,
    ForgotpasswordRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ForgotPasswordModule {}
