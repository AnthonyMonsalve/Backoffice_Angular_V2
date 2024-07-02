import { Component, OnInit } from '@angular/core';
import { UserService } from '@user/application/services/user.service'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
})
export class UserActionsComponent implements OnInit {
  roles?: string[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe((roles) => {
      this.roles = roles.roles;
    });
  }

  isAdmin(): boolean | undefined {
    return this.roles?.includes('ADMIN');
  }
}
