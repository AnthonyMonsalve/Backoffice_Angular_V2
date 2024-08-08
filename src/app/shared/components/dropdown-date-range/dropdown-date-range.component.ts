import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DropdownItem } from '@core/interfaces/dropdown-date-range.interface';
import { DROPDOWN } from './dropdown';
import { LanguageService } from '@services/utils/language.service';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dropdown-date-range',
  templateUrl: './dropdown-date-range.component.html',
})
export class DropdownDateRangeComponent {
  @Input() currentSelection!: string;
  @Input() customRangeActive: boolean = false;
  @Output() selectionChange = new EventEmitter<string>();
  items: string[] = [];
  dropdownItems: DropdownItem[] = [];
  nameCurrentSelection: string = '';

  constructor(
    public languageService: LanguageService,
    public _cookiesService: CookieService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.initialize();
    this.initNameCurrentSelection();
    console.log(this.currentSelection);
  }

  updateSelection(item: string): void {
    this.selectionChange.emit(item);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentSelection']) {
      this.initNameCurrentSelection();
    }
  }

  initialize(): void {
    this.dropdownItems = DROPDOWN;
  }

  initNameCurrentSelection(): void {
    const foundItem = this.dropdownItems.find(
      (item) => item.action === this.currentSelection
    );

    // Si se encuentra el objeto, asigna su nombre a la variable monthlySortName
    if (foundItem) {
      this.nameCurrentSelection = foundItem.name;
    }
  }
}
