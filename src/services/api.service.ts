import { environment } from '../config/environment';
import { authService } from './auth.service';
import type { UserBalance, WalletInfo, WalletType } from '../models/game-slot.model';

function authHeaders(): HeadersInit {
  const token = authService.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

class ApiService {
  async getUserBalance(): Promise<UserBalance> {
    const res = await fetch(`${environment.apiUrl}/ext/user/userbalance`, {
      headers: authHeaders(),
    });
    return res.json();
  }

  async joinRoom(walletName: WalletType): Promise<WalletInfo> {
    const res = await fetch(
      `${environment.apiUrlSlot}/gameworker/room`,
      {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ walletName }),
      },
    );
    return res.json();
  }

  async outRoom(): Promise<void> {
    await fetch(`${environment.apiUrlSlot}/gameworker/room`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
  }
}

export const apiService = new ApiService();
