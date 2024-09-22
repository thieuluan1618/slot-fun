import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface User {}

export interface AuthResponse {
  accessToken: string;
  balance: number;
  binanceId: string;
  email: string;
  enabledMfa: boolean;
  fullName: string;
  isVerified: boolean;
  iss: string;
  phoneNumber: string;
  refCode: string | null;
  refId: string | null;
  site: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
  ) {}

  login(
    username: string = 'francisco21',
    password: string = '123456',
    ip: string = 'string',
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(
        'https://gateway.api.jackpot2024.win/api/v1/users/login',
        {
          username,
          password,
          ip,
        },
      )
      .pipe(
        tap((res: AuthResponse) => {
          this.setToken(res.accessToken);
        }),
      ) as Observable<AuthResponse>;
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getAsset(): Observable<any> {
    return this.http.get<any>(
      'https://gateway.api.jackpot2024.win/api/gameworker/assets',
    );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
