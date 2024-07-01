import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { LAYOUT_MODE } from '@shared/layouts/layouts.model';
import { User } from 'src/app/core/models/auth.models';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { AuthenticationService } from '../../core/services/auth.service';
import { UserProfileService } from '../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

/**
 * Register Component
 */
export class RegisterComponent implements OnInit {
  // set the currenr year
  year: number = new Date().getFullYear();

  // Carousel navigation arrow show
  showNavigationArrows: any;

  layout_mode!: string;

  signupForm!: UntypedFormGroup;
  submitted = false;
  successmsg = false;
  error = '';
  status: RequestStatus = 'init';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserProfileService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.layout_mode = LAYOUT_MODE;
    if (this.layout_mode === 'dark') {
      this.renderer.setAttribute(document.body, 'data-bs-theme', 'dark');
    }

    // Validation Set
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.renderer.setAttribute(document.body, 'data-layout', 'vertical');
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    const user = new User(
      this.f.email.value,
      this.f.firstName.value,
      this.f.lastName.value,
      this.f.password.value
    );

    this.authenticationService.register(user).subscribe({
      next: (data) => {
        this.status = 'success';
        this.router.navigate(['/account/login']);
        console.log(data);
      },
      error: (error) => {
        console.log(error);
        this.status = 'failed';
      },
    });
  }
}
