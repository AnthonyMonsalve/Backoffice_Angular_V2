import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '@user/application/services/user-state.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(
    private userStateService: UserStateService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.userStateService.user$.pipe(
      map((user) => {
        if (user && user.roles.includes('ADMIN')) {
          return true;
        } else {
          this.router.navigate(['/unauthorized']); // Redirigir a una página de no autorizado
          return false;
        }
      })
    );
  }
}
