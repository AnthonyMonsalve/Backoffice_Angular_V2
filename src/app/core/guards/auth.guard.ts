import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '../services/token.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router, private tokenService: TokenService) {}

  canActivate(): boolean {
    const isValidToken = this.tokenService.isValidToken();
    if (!isValidToken) {
      this.router.navigate(['/account/login']);
      return false;
    }
    return true;
  }
}
