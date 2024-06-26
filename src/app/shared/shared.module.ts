import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { PagetitleComponent } from './components/pagetitle/pagetitle.component';
import { Basic404Component } from './pages/basic404/basic404.component';
import { AbbreviateNumberPipe } from './pipes/abbreviate-number.pipe';
import {} from './shared-routing.module';
import { WidgetModule } from './widget/widget.module';

@NgModule({
  declarations: [PagetitleComponent, AbbreviateNumberPipe, Basic404Component],
  imports: [CommonModule, WidgetModule, RouterModule],
  exports: [PagetitleComponent, AbbreviateNumberPipe],
})
export class SharedModule {}
