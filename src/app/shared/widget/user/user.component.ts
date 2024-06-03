import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

/**
 * User Component
 */
export class UserComponent implements OnInit {

  @Input() users: Array<{
    id?: string;
    date?: string;
    status?: string;
    image?: string;
    name?: string;
    title?: string;
    email?: string;
    phone?: string;
    location?: string;
  }> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  // Delete Order
  deleteOrder(id: any) {
    this.users?.splice(id,1)
  }

}
