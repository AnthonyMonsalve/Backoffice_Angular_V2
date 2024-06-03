import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BasicComponent } from './basic/basic.component';
import { SigninRoutingModule } from './signin-routing.module';

@NgModule({
  declarations: [BasicComponent],
  imports: [
    CommonModule,
    SigninRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SigninModule {}
