import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@services/auth.service';
import { User } from 'src/app/core/models/auth.models';
import { UserService } from 'src/app/user/application/services/user.service';
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
  user: User | null = null;
  profileForm!: FormGroup;
  submit: boolean = false;

  config = {
    slidesToShow: 3,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  };

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this._fetchData();

    this.authService.user$.subscribe((user) => {
      this.user = user;
      this._initializeForm(user);
    });
  }

  private _fetchData() {
    this.slides = slides;
    this.blogs = blogs;
  }

  private _initializeForm(user: User | null) {
    this.profileForm = this.fb.group({
      firstName: [user?.profile?.firstName || '', Validators.required],
      lastName: [user?.profile?.lastName || '', Validators.required],
      avatar: [user?.profile?.avatar || '', Validators.email],
    });
  }

  get form() {
    return this.profileForm.controls;
  }

  onSubmit() {
    this.submit = true;
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;

      const payload = Object.keys(formData)
        .filter((key) => formData[key] != null && formData[key] !== '')
        .reduce((obj: { [key: string]: any }, key) => {
          obj[key] = formData[key];
          return obj;
        }, {});

      this.userService.updateUser(payload).subscribe(
        (response) => {
          console.log('Datos enviados con éxito', response);
        },
        (error) => {
          console.error('Error al enviar los datos', error);
        }
      );
    }
  }
}
