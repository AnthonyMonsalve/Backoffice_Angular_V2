import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment_dev } from '@environments/environment.dev';
import { Observable } from 'rxjs';
import { checkToken } from 'src/app/core/helpers/jwt.interceptor';
import { User } from 'src/app/core/models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment_dev.API_URL; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/api/users/profile`, user, {
      context: checkToken(),
    });
  }

  updatePassword(pass: any): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrl}/api/auth/change-password`,
      pass,
      {
        context: checkToken(),
      }
    );
  }
}
