import { Component } from '@angular/core';
import { AuthenticationService } from '@services/auth.service';
import { User } from './core/models/auth.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dashonic';
  currentUser: User | null = null;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
  }
}
