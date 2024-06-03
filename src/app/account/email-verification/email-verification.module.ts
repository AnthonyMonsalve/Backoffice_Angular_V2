import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BasicComponent } from './basic/basic.component';
import { EmailverificationRoutingModule } from './email-verification-routing.module';

@NgModule({
  declarations: [BasicComponent],
  imports: [CommonModule, EmailverificationRoutingModule],
})
export class EmailVerificationModule {}
