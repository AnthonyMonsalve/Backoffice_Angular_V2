import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgOtpInputModule } from 'ng-otp-input';

import { BasicComponent } from './basic/basic.component';
import { TwostepverificationRoutingModule } from './twostep-verification-routing.module';

@NgModule({
  declarations: [BasicComponent],
  imports: [CommonModule, TwostepverificationRoutingModule, NgOtpInputModule],
})
export class TwostepVerificationModule {}
