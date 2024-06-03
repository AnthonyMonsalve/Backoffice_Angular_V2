import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PagetitleComponent } from './components/pagetitle/pagetitle.component';
import { Basic404Component } from './pages/basic404/basic404.component';
import {} from './shared-routing.module';
import { WidgetModule } from './widget/widget.module';

@NgModule({
  declarations: [PagetitleComponent, Basic404Component],
  imports: [CommonModule, WidgetModule, RouterModule],
  exports: [PagetitleComponent],
})
export class SharedModule {}
