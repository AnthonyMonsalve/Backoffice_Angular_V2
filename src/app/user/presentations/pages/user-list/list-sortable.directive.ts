import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { UserList } from './list.model';

export type SortColumn = keyof UserList | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
    columns: SortColumn;
    directions: SortDirection;
}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: 'th[userSorTable]',
    // tslint:disable-next-line: no-host-metadata-property
    host: {
        '[class.asc]': 'direction === "asc"',
        '[class.desc]': 'direction === "desc"',
        '(click)': 'rotateText()'
    }
})

export class UserSortableDirective {

    constructor() { }

    @Input() userSorTable: SortColumn = '';
    @Input() directions: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();

    rotateText() {
        this.directions = rotate[this.directions];
        this.sort.emit({ columns: this.userSorTable, directions: this.directions });
    }
}
