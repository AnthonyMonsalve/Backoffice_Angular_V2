import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CardMessageComponent } from './components/card-message/card-message.component';
import { CardTerminalComponent } from './components/card-terminal/card-terminal.component';
import { GroupOfTerminalsComponent } from './components/group-of-terminals/group-of-terminals.component';
import { PagetitleComponent } from './components/pagetitle/pagetitle.component';
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';
import { Basic404Component } from './pages/basic404/basic404.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { AbbreviateNumberPipe } from './pipes/abbreviate-number.pipe';
import {} from './shared-routing.module';
import { WidgetModule } from './widget/widget.module';
import { NumberToDatePipe } from './pipes/timeId-to-date.pipe';

@NgModule({
  declarations: [
    PagetitleComponent,
    TablePaginationComponent,
    CardMessageComponent,
    CardTerminalComponent,
    AbbreviateNumberPipe,
    UnauthorizedComponent,
    Basic404Component,
    GroupOfTerminalsComponent,
    NumberToDatePipe,
  ],
  imports: [CommonModule, WidgetModule, RouterModule],
  exports: [
    PagetitleComponent,
    TablePaginationComponent,
    GroupOfTerminalsComponent,
    CardMessageComponent,
    AbbreviateNumberPipe,
    NumberToDatePipe,
  ],
})
export class SharedModule {}
