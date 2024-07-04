import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/auth.service';
import { User } from 'src/app/core/models/auth.models';
import { blogs, slides } from './data';
import { blogModel, slideModel } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  slides!: slideModel[];
  blogs!: blogModel[];
  type: string = 'component';
  show: boolean = true;
  currentUser: User | null = null;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this._fetchData();
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
  }

  private _fetchData() {
    this.slides = slides;
    this.blogs = blogs;
  }
}
