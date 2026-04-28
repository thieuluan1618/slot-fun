import { environment } from '../config/environment';
import { authService } from './auth.service';
import type { BetResult, UserBalance, WalletType } from '../models/game-slot.model';

export type WalletInfo = {
  playMode: string;
  userBalance: number;
};

export interface GameHistoryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  wallet: string;
  betResult?: string;
  fromDate?: string;
  toDate?: string;
  userId?: string;
  gameKey?: string;
}

function authHeaders(): HeadersInit {
  const token = authService.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

class ApiService {
  private baseUrl = environment.apiUrl;

  async getHistory(params: GameHistoryParams): Promise<unknown> {
    const res = await fetch(
      `${environment.apiUrlSlot}/ext/gamehistory?gameKey=slot&page=0&pageSize=5&search=&wallet=main&betResult=win&fromDate=&toDate=&userId=f5074a35-8444-4131-a17a-ceeca76ea334`,
      { headers: authHeaders() },
    );
    return res.json();
  }

  async getUserBalance(): Promise<UserBalance> {
    const res = await fetch(`${this.baseUrl}/ext/user/userbalance`, {
      headers: authHeaders(),
    });
    return res.json();
  }

  async joinRoom(walletName: WalletType): Promise<WalletInfo> {
    const res = await fetch(
      'https://gateway.api.jackpot2024.win/slot/api/gameworker/room',
      {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ walletName }),
      },
    );
    return res.json();
  }

  async placeOrder(betAmount: number): Promise<BetResult> {
    const res = await fetch(
      'https://gateway.api.jackpot2024.win/slot/api/gameworker/order',
      {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ betAmount }),
      },
    );
    return res.json();
  }

  async outRoom(): Promise<void> {
    await fetch(`${environment.apiUrlSlot}/api/gameworker/room`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
  }
}

export const apiService = new ApiService();
