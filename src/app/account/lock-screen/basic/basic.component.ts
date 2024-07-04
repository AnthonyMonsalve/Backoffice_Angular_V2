import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { User } from '../../../core/models/auth.models';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})

/**
 * Lock Screen basic component
 */
export class BasicComponent implements OnInit {
  // set the currenr year
  year: number = new Date().getFullYear();
  submitted = false;
  lockscreenForm!: UntypedFormGroup;
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
    this.lockscreenForm = this.formBuilder.group({
      password: ['', Validators.required],
    });

    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.lockscreenForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.lockscreenForm.invalid) {
      return;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/account/login']);
  }
}
