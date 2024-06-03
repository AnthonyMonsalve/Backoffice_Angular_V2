import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BasicComponent } from './basic/basic.component';
import { ThankyouRoutingModule } from './thankyou-routing.module';

@NgModule({
  declarations: [BasicComponent],
  imports: [CommonModule, ThankyouRoutingModule],
})
export class ThankyouModule {}
