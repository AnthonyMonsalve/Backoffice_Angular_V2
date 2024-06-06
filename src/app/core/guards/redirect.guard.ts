import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { TokenService } from '../services/token.service';

@Injectable({ providedIn: 'root' })
export class RedirectGuard {
  constructor(private router: Router, private tokenService: TokenService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.tokenService.getToken();
    if (token) {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/'], {
        queryParams: { returnUrl: state.url },
      });
    }
    return true;
  }
}
