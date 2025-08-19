import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../interfaces/ILogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _httpClient: HttpClient = inject(HttpClient);

  private apiUrl = 'http://localhost:8000/api/v1/auth';
  private tokenKey = 'token';
  private userKey = 'user';

  register(user: IUser): Observable<any> {
    return this._httpClient.post(`${this.apiUrl}/register`, user);
  }

  login(user: ILogin): Observable<any> {
    return this._httpClient.post(`${this.apiUrl}/login`, user);
  }

  isAuthenticated = (): boolean => {
    const token = window.localStorage.getItem('token');

    return Boolean(token)
  }

  setTokenInLocalS(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getTokenFromLocalS(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeTokenFromLocalS(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setUserInLocalS(user: string): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUserFromLocalS(): string | null {
    return localStorage.getItem(JSON.parse(this.userKey));
  }

  removeUserFromLocalS(): void {
    localStorage.removeItem(this.userKey);
  }

  isAuth(): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/isAuth`);
  }
}
