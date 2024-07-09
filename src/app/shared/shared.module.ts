import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CardMessageComponent } from './components/card-message/card-message.component';
import { PagetitleComponent } from './components/pagetitle/pagetitle.component';
import { PaginationListComponent } from './components/pagination-list/pagination-list.component';
import { Basic404Component } from './pages/basic404/basic404.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { AbbreviateNumberPipe } from './pipes/abbreviate-number.pipe';
import {} from './shared-routing.module';
import { WidgetModule } from './widget/widget.module';

@NgModule({
  declarations: [
    PagetitleComponent,
    PaginationListComponent,
    CardMessageComponent,
    AbbreviateNumberPipe,
    UnauthorizedComponent,
    Basic404Component,
  ],
  imports: [CommonModule, WidgetModule, RouterModule],
  exports: [
    PagetitleComponent,
    PaginationListComponent,
    CardMessageComponent,
    AbbreviateNumberPipe,
  ],
})
export class SharedModule {}
