import { environment } from '../config/environment';
import type { AuthResponse } from '../models/game-slot.model';

class AuthService {
  async login(
    username = 'francisco21',
    password = '123456',
    ip = 'string',
  ): Promise<AuthResponse> {
    const res = await fetch(
      `${environment.apiUrl}/v1/users/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, ip }),
      },
    );
    const data: AuthResponse = await res.json();
    this.setToken(data.accessToken);
    return data;
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}

export const authService = new AuthService();
