import { Component, OnInit } from '@angular/core';
import {
  UserList,
  UserListResponse,
} from '@user/application/interfaces/list.model';
import { UserService } from '@user/application/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: UserList[] = [];
  breadCrumbItems: Array<{}> = [
    { label: 'User' },
    { label: 'Admin' },
    { label: 'User List', active: true },
  ];
  order: string = 'ASC';
  page: number = 1;
  limit: number = 10;
  total: number = 0;
  lastPage: number = 1;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService
      .getUsers(this.order, this.page, this.limit)
      .subscribe((data: UserListResponse) => {
        this.users = data.users;
        this.total = data.metadata.total;
        this.page = data.metadata.page;
        this.lastPage = data.metadata.lastPage;
      });
  }
}
