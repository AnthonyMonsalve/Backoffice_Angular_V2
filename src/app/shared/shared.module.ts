import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import {
  NgbDropdownModule,
  NgbNavModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SimplebarAngularModule } from 'simplebar-angular';
import { BankImageSmallName } from './components/bank-image-small-name/bank-image-small-name.component';
import { cardBanksTotalClosuresComponent } from './components/card-banks-total-closures/card-banks-total-closures.component';
import { CardMessageComponent } from './components/card-message/card-message.component';
import { CardTerminalComponent } from './components/card-terminal/card-terminal.component';
import { DateRangeDisplayComponent } from './components/date-range-display/date-range-display.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { DropdownDateRangeComponent } from './components/dropdown-date-range/dropdown-date-range.component';
import { GroupOfTerminalsComponent } from './components/group-of-terminals/group-of-terminals.component';
import { LoadingCardComponent } from './components/loading-card/loading-card.component';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';
import { PagetitleComponent } from './components/pagetitle/pagetitle.component';
import { TablePaginationComponent } from './components/table-pagination/table-pagination.component';
import { TopAffiliatesFromCommerceComponent } from './components/top-affiliates-from-commerce/top-affiliates-from-commerce.component';
import { TopCommercesComponent } from './components/top-commerces/top-commerces.component';
import { Basic404Component } from './pages/basic404/basic404.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { AbbreviateNumberPipe } from './pipes/abbreviate-number.pipe';
import { PercentagePipe } from './pipes/percentage.pipe';
import { NumberToDatePipe } from './pipes/timeId-to-date.pipe';
import {} from './shared-routing.module';
import { WidgetModule } from './widget/widget.module';

@NgModule({
  declarations: [
    PagetitleComponent,
    TablePaginationComponent,
    CardMessageComponent,
    CardTerminalComponent,
    AbbreviateNumberPipe,
    PercentagePipe,
    UnauthorizedComponent,
    Basic404Component,
    GroupOfTerminalsComponent,
    NumberToDatePipe,
    BankImageSmallName,
    DateRangePickerComponent,
    ModalErrorComponent,
    TopAffiliatesFromCommerceComponent,
    TopCommercesComponent,
    DateRangeDisplayComponent,
    DropdownDateRangeComponent,
    LoadingCardComponent,
    cardBanksTotalClosuresComponent,
  ],
  imports: [
    CommonModule,
    WidgetModule,
    RouterModule,
    NgbNavModule,
    NgbTooltipModule,
    NgbDropdownModule,
    FlatpickrModule.forRoot(),
    SimplebarAngularModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [
    PagetitleComponent,
    TablePaginationComponent,
    GroupOfTerminalsComponent,
    CardMessageComponent,
    AbbreviateNumberPipe,
    PercentagePipe,
    NumberToDatePipe,
    BankImageSmallName,
    DateRangePickerComponent,
    TopAffiliatesFromCommerceComponent,
    ModalErrorComponent,
    TopCommercesComponent,
    DateRangeDisplayComponent,
    DropdownDateRangeComponent,
    LoadingCardComponent,
    cardBanksTotalClosuresComponent,
  ],
})
export class SharedModule {}
