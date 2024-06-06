import { Injectable } from '@angular/core';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string) {
    setCookie('token-backoffice', token, {
      expires: 365,
      path: '/',
    });
  }

  getToken() {
    const token = getCookie('token-backoffice');
    return token;
  }

  removeToken() {
    removeCookie('token-backoffice');
  }
}
