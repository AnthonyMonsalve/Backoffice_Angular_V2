import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '@services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser.pipe(
      map((user) => {
        if (user && user.roles.includes('ADMIN')) {
          return true;
        } else {
          this.router.navigate(['/unauthorized']); // Redirige a una página de acceso denegado
          return false;
        }
      })
    );
  }
}
