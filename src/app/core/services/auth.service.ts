import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment_dev } from '@environments/environment.dev';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getFirebaseBackend } from '../../authUtils';
import { checkToken } from '../../core/helpers/jwt.interceptor';
import { TokenService } from '../../core/services/token.service';
import { ResponseLogin } from '../interfaces/auth.interface';
import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {
  apiUrl = environment_dev.API_URL;
  user$ = new BehaviorSubject<User | null>(null);
  user!: User;
  currentUserValue: any;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getDataUser() {
    return this.user$.getValue();
  }

  /**
   * Performs the register
   * @param firstName email
   * @param lastName password
   * @param email email
   * @param password password
   */
  register(user: User) {
    return this.http.post(`${this.apiUrl}/api/auth/register`, user);
  }

  /**
   * Performs the auth
   * @param email email of user
   * @param password password of user
   */
  login(email: string, password: string) {
    return this.http
      .post<ResponseLogin>(`${this.apiUrl}/api/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.token);
        })
      );
  }

  /**
   * Returns the current user
   */
  public currentUser(): any {
    const token = this.tokenService.getToken();
    return this.http
      .get<User>(`${this.apiUrl}/api/auth/profile-user`, {
        context: checkToken(),
      })
      .pipe(
        tap((user) => {
          this.user$.next(user);
        })
      );
  }

  /**
   * Logout the user
   */
  logout() {
    // logout the user
    this.tokenService.removeToken();
  }

  /**
   * Reset password
   * @param email email
   */
  resetPassword(email: string) {
    return getFirebaseBackend()!
      .forgetPassword(email)
      .then((response: any) => {
        const message = response.data;
        return message;
      });
  }
}
