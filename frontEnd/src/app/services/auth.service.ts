import { inject, Injectable } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../interfaces/ILogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _httpClient: HttpClient = inject(HttpClient);

  private apiUrl = 'http://localhost:8000/api/v1/auth';

  register(user: IUser): Observable<any> {
    return this._httpClient.post(`${this.apiUrl}/register`, user);
  }

  login(user: ILogin): Observable<any> {
    return this._httpClient.post(`${this.apiUrl}/login`, user);
  }

  isAuthenticated = (): boolean => {
    const token = window.localStorage.getItem('token');

    console.log(Boolean(token));

    return Boolean(token)
  }
}
