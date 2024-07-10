import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { RequestStatus } from '@core/models/request-status.model';
import { AuthenticationService } from '@core/services/auth.service';
import { LAYOUT_MODE } from '@shared/layouts/layouts.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {
  // set the currenr year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;
  loginForm!: UntypedFormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  layout_mode!: string;
  fieldTextType!: boolean;
  status: RequestStatus = 'init';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.layout_mode = LAYOUT_MODE;
    if (this.layout_mode === 'dark') {
      this.renderer.setAttribute(document.body, 'data-bs-theme', 'dark');
    }
    //Validation Set
    this.loginForm = this.formBuilder.group({
      email: [
        '22anthony.monsalve@gmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['Maxtoto2020.', [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.renderer.setAttribute(document.body, 'data-layout', 'vertical');
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    // this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .subscribe({
        next: (data) => {
          this.status = 'success';
          this.router.navigate(['/']);
          console.log('data');
          this.loginForm.reset();
        },
        error: (error) => {
          console.log(error);
          this.status = 'failed';
          this.loginForm.reset();
        },
      });
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
