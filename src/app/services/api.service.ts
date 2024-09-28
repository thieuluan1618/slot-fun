import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BetResult, UserBalance, WalletType } from '../models/game-slot.model';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl;

  getHistory(params: GameHistoryParams): Observable<any> {
    const { wallet, userId } = params;
    const httpParams = new HttpParams()
      .set('page', '0')
      .set('pageSize', '10')
      .set('search', '')
      .set('wallet', wallet)
      .set('betResult', '')
      .set('fromDate', '')
      .set('toDate', '')
      .set('userId', userId)
      .set('gameKey', 'slot');

    return this.http.get(
      `${environment.apiUrlSlot}/ext/gamehistory?gameKey=slot&page=0&pageSize=5&search=&wallet=main&betResult=win&fromDate=&toDate=&userId=f5074a35-8444-4131-a17a-ceeca76ea334`,
      {
        params: {},
      },
    );
  }

  getUserBalance() {
    return this.http.get<UserBalance>(`${this.baseUrl}/ext/user/userbalance`);
  }

  getHistoryDetails() {
    return this.http.get(`${this.baseUrl}/gamehistory`);
  }

  getJackpotWinner() {
    return this.http.get(`${this.baseUrl}/jackpot/getJackpotWinner`);
  }

  joinRoom(walletName: WalletType): Observable<WalletInfo> {
    return this.http.post<WalletInfo>(
      `https://gateway.api.jackpot2024.win/slot/api/gameworker/room`,
      {
        walletName,
      },
    );
  }

  placeOrder(betAmount: number) {
    return this.http.post<BetResult>(
      `https://gateway.api.jackpot2024.win/slot/api/gameworker/order`,
      {
        betAmount,
      },
    );
  }

  outRoom() {
    return this.http.delete(`${environment.apiUrlSlot}/api/gameworker/room`);
  }

  betRewardSender() {
    return this.http.post(`${environment.apiUrlSlot}/bet/results`, {});
  }
}
