import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '../services/token.service';

@Injectable({ providedIn: 'root' })
export class RedirectGuard {
  constructor(private router: Router, private tokenService: TokenService) {}

  canActivate() {
    const isValidToken = this.tokenService.isValidToken();
    if (isValidToken) {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/']);
    }
    return true;
  }
}
