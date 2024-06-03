import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BasicComponent } from './basic/basic.component';
import { ResetpasswordRoutingModule } from './reset-password-routing.module';

@NgModule({
  declarations: [BasicComponent],
  imports: [CommonModule, ResetpasswordRoutingModule],
})
export class ResetPasswordModule {}
