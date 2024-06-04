import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.prod';
import { getFirebaseBackend } from '../../authUtils';
import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {
  apiUrl = environment.API_URL;
  user!: User;
  currentUserValue: any;

  constructor(private http: HttpClient) {}

  /**
   * Performs the register
   * @param email email
   * @param password password
   */
  register(email: string, password: string) {
    return getFirebaseBackend()!
      .registerUser(email, password)
      .then((response: any) => {
        const user = response;
        return user;
      });
  }

  /**
   * Performs the auth
   * @param email email of user
   * @param password password of user
   */
  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/api/auth/login`, {
      email,
      password,
    });
  }

  /**
   * Returns the current user
   */
  public currentUser(): any {
    return getFirebaseBackend()!.getAuthenticatedUser();
  }

  /**
   * Logout the user
   */
  logout() {
    // logout the user
    return getFirebaseBackend()!.logout();
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
