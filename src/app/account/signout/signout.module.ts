import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BasicComponent } from './basic/basic.component';
import { SignoutRoutingModule } from './signout-routing.module';

@NgModule({
  declarations: [BasicComponent],
  imports: [CommonModule, SignoutRoutingModule],
})
export class SignoutModule {}
