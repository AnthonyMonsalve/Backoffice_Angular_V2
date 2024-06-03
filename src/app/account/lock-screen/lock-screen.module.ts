import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BasicComponent } from './basic/basic.component';
import { LockscreenRoutingModule } from './lockscreen-routing.module';

@NgModule({
  declarations: [BasicComponent],
  imports: [
    CommonModule,
    LockscreenRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class LockScreenModule {}
