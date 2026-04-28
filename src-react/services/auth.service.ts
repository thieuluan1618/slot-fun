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

class AuthService {
  async login(
    username = 'francisco21',
    password = '123456',
    ip = 'string',
  ): Promise<AuthResponse> {
    const res = await fetch(
      'https://gateway.api.jackpot2024.win/api/v1/users/login',
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
