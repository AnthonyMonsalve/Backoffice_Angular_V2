import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment_dev } from '@environments/environment.dev';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { checkToken } from '../../core/helpers/jwt.interceptor';
import { TokenService } from '../../core/services/token.service';
import { ResponseLogin } from '../interfaces/auth.interface';
import { User } from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private apiUrl = environment_dev.API_URL;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/register`, user);
  }

  login(email: string, password: string): Observable<ResponseLogin> {
    return this.http
      .post<ResponseLogin>(`${this.apiUrl}/api/auth/login`, { email, password })
      .pipe(
        tap((response: ResponseLogin) => {
          this.tokenService.saveToken(response.token);
          this.loadCurrentUser();
        })
      );
  }

  loadCurrentUser() {
    const token = this.tokenService.getToken();
    if (token) {
      this.http
        .get<User>(`${this.apiUrl}/api/auth/profile-user`, {
          context: checkToken(),
        })
        .subscribe((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        });
    } else {
      this.currentUserSubject.next(null);
    }
  }

  logout() {
    this.tokenService.removeToken();
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  updateUser(updatedUser: User) {
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    this.currentUserSubject.next(updatedUser);
  }
}
