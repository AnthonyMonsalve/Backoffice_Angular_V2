import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AffiliateService } from '@services/affiliate.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AffiliateExistenceGuard {
  constructor(
    private affiliateService: AffiliateService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const sk = route.paramMap.get('sk');
    if (sk) {
      return this.affiliateService.getAffiliate(sk).pipe(
        map(() => {
          // Si la petición es exitosa, significa que el `sk` existe
          return true;
        }),
        catchError((error) => {
          // Maneja el error 404
          if (error.status === 404) {
            // Redirige si no existe
            this.router.navigate(['/not-found']); // O la ruta a donde quieras redirigir
          } else {
            // Maneja otros errores si es necesario
            this.router.navigate(['/error']);
          }
          return of(false);
        })
      );
    } else {
      // Redirige si el parámetro `sk` no está presente
      this.router.navigate(['/error']);
      return false;
    }
  }
}
