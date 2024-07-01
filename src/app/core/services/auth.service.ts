import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment_dev } from '@environments/environment.dev';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getFirebaseBackend } from '../../authUtils';
import { checkToken } from '../../core/helpers/jwt.interceptor';
import { TokenService } from '../../core/services/token.service';
import { UserStateService } from '../../user/application/services/user-state.service';
import { ResponseLogin } from '../interfaces/auth.interface';
import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  apiUrl = environment_dev.API_URL;
  user$ = new BehaviorSubject<User | null>(null);
  user!: User;
  currentUserValue: any;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private userStateService: UserStateService
  ) {}

  getDataUser() {
    return this.user$.getValue();
  }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/api/auth/register`, user);
  }

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

  currentUser(): any {
    const token = this.tokenService.getToken();
    return this.http
      .get<User>(`${this.apiUrl}/api/auth/profile-user`, {
        context: checkToken(),
      })
      .pipe(
        tap((user) => {
          this.user$.next(user);
          this.userStateService.setUser(user);
        })
      );
  }

  logout() {
    this.tokenService.removeToken();
  }

  resetPassword(email: string) {
    return getFirebaseBackend()!
      .forgetPassword(email)
      .then((response: any) => {
        const message = response.data;
        return message;
      });
  }
}
