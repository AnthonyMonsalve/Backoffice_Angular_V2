import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BasicComponent } from './basic/basic.component';
import { SignupRoutingModule } from './signup-routing.module';

@NgModule({
  declarations: [BasicComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SignupModule {}
