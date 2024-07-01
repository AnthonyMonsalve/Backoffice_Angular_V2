import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { DecimalPipe } from '@angular/common';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { tableData } from './data';
import { UserSortableDirective } from './list-sortable.directive';
import { UserList } from './list.model';
import { UserListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [UserListService, DecimalPipe],
})

/**
 * List Component
 */
export class UserListComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  tables$!: Observable<UserList[]>;
  total$: Observable<number>;
  userForm!: UntypedFormGroup;
  tableData!: UserList[];
  submitted = false;

  @ViewChildren(UserSortableDirective)
  headers!: QueryList<UserSortableDirective>;

  masterSelected: boolean;
  checklist: any;
  checkedList: any;

  isDesc: boolean = false;
  column: any = 'name';

  constructor(
    public service: UserListService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
    this.masterSelected = false;
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'User' },
      { label: 'Admin' },
      { label: 'User List', active: true },
    ];

    /**
     * Form Validation
     */
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });

    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * User grid data fetches
   */
  private _fetchData() {
    this.tableData = tableData;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { centered: true });
  }

  /**
   * Form data get
   */
  get form() {
    return this.userForm.controls;
  }

  /**
   * Save user
   */
  saveUser() {
    if (this.userForm.valid) {
      const name = this.userForm.get('name')?.value;
      const position = this.userForm.get('position')?.value;
      const email = this.userForm.get('email')?.value;
      const tags = this.userForm.get('tags')?.value;
      const image = 'assets/images/users/avatar-1.jpg';
      this.tableData.push({
        id: this.tableData.length + 1,
        name,
        position,
        email,
        tags,
        image,
      });
      this.modalService.dismissAll();
    }
    this.submitted = true;
  }

  /**
   * Sort data
   * @param property
   */
  sort(property: string | number) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.tableData.sort((a: any, b: any) => {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    for (var i = 0; i < this.tableData.length; i++) {
      this.tableData[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.tableData.every(function (item: any) {
      return item.isSelected == true;
    });
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.tableData.length; i++) {
      if (this.tableData[i].isSelected)
        this.checkedList.push(this.tableData[i]);
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }

  // Delete Contact
  deleteContact(id: any) {
    this.tableData.splice(id, 1);
  }
}
