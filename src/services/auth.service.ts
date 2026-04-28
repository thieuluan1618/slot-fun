import { environment } from "../config/environment";
import type { AuthResponse } from "../models/game-slot.model";

const MOCK_AUTH: AuthResponse = {
  accessToken: "mock-token-dev",
  balance: 10000,
  binanceId: "mock-binance",
  email: "dev@mock.local",
  enabledMfa: false,
  fullName: "Dev User",
  isVerified: true,
  iss: "mock",
  phoneNumber: "",
  refCode: null,
  refId: null,
  site: "mock",
  username: "devuser",
};

class AuthService {
  async login(
    username = "francisco21",
    password = "123456",
    ip = "string",
  ): Promise<AuthResponse> {
    if (environment.mockApi) {
      this.setToken(MOCK_AUTH.accessToken);
      return MOCK_AUTH;
    }
    const res = await fetch(`${environment.apiUrl}/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, ip }),
    });
    const data: AuthResponse = await res.json();
    this.setToken(data.accessToken);
    return data;
  }

  setToken(token: string) {
    localStorage.setItem("access_token", token);
  }

  getToken(): string | null {
    return localStorage.getItem("access_token");
  }

  logout() {
    localStorage.removeItem("access_token");
  }
}

export const authService = new AuthService();
