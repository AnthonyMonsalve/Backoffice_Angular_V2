import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.prod';
import { tap } from 'rxjs/operators';
import { getFirebaseBackend } from '../../authUtils';
import { TokenService } from '../../core/services/token.service';
import { ResponseLogin, User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {
  apiUrl = environment.API_URL;
  user!: User;
  currentUserValue: any;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  /**
   * Performs the register
   * @param firstName email
   * @param lastName password
   * @param email email
   * @param password password
   */
  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    return this.http.post(`${this.apiUrl}/api/auth/register`, {
      firstName,
      lastName,
      email,
      password,
    });
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
    return this.http.get<User>(`${this.apiUrl}/api/auth/info-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
