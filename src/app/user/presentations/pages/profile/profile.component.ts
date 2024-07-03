import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/auth.models';
import { UserStateService } from '../../../application/services/user-state.service';
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
  user!: User;

  constructor(private userStateService: UserStateService) {}

  ngOnInit(): void {
    this._fetchData();

    this.userStateService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
  }

  private _fetchData() {
    this.slides = slides;
    this.blogs = blogs;
  }
}
