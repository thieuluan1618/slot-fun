import { environment } from "../config/environment";
import { authService } from "./auth.service";
import type {
  UserBalance,
  WalletInfo,
  WalletType,
} from "../models/game-slot.model";

const MOCK_BALANCE: UserBalance = {
  main: { VND: 5000000, USDT: 200 },
  promo: { VND: 1000000, USDT: 50 },
  affiliate: { VND: 0, USDT: 0 },
};

function authHeaders(): HeadersInit {
  const token = authService.getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

class ApiService {
  async getUserBalance(): Promise<UserBalance> {
    if (environment.mockApi) return MOCK_BALANCE;
    const res = await fetch(`${environment.apiUrl}/ext/user/userbalance`, {
      headers: authHeaders(),
    });
    return res.json();
  }

  async joinRoom(walletName: WalletType): Promise<WalletInfo> {
    if (environment.mockApi) {
      return {
        playMode: walletName,
        userBalance: MOCK_BALANCE[walletName]?.VND ?? 0,
      };
    }
    const res = await fetch(`${environment.apiUrlSlot}/gameworker/room`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ walletName }),
    });
    return res.json();
  }

  async outRoom(): Promise<void> {
    if (environment.mockApi) return;
    await fetch(`${environment.apiUrlSlot}/gameworker/room`, {
      method: "DELETE",
      headers: authHeaders(),
    });
  }
}

export const apiService = new ApiService();
